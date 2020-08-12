import metadata from "../metadata";

export function parse(json) {
  const fromServer = new Map(Object.entries(json["camunda.bpm"]));
  const categories = metadata.map((category) => {
    const namespace = category.key.replace("camunda.bpm.", "");

    if (namespace === "camunda.bpm") {
      const properties = category.properties.map((property) => {
        if (fromServer.has(property.name)) {
          const defaultValue = fromServer.get(property.name);

          return { ...property, defaultValue };
        }

        return property;
      });

      return { ...category, properties };
    }

    if (fromServer.has(namespace)) {
      const properties = category.properties.map((property) => {
        const defaultValue = fromServer.get(namespace)[property.name];

        if (fromServer.get(namespace)[property.name]) {
          return { ...property, defaultValue };
        }

        return property;
      });

      return { ...category, properties };
    }

    return category;
  });

  return categories;
}

export function convertDataType(value) {
  if (value === "on") {
    return true;
  } else if (value === "off") {
    return false;
  }

  if (Number(value) && typeof value != "boolean") {
    return Number(value);
  }

  return value;
}

export function restify(formData) {
  let json = {};

  for (let [key, value] of formData.entries()) {
    value = convertDataType(value);

    const [property, namespace] = key.substr(12).split(".").reverse();

    if (!namespace) {
      json[property] = value;
    } else {
      if (!json[namespace]) {
        json[namespace] = {};
      }

      json[namespace][property] = value;
    }
  }

  return json;
}