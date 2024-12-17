export function AutoAccessor(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const privateKey = `_${String(propertyKey)}`;

    // Define la propiedad privada
    Object.defineProperty(target, privateKey, {
      writable: true,
      enumerable: false,
      configurable: true,
    });

    // Define el getter y setter para la propiedad
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this[privateKey];
      },
      set: function (value: any) {
        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });

    // Genera un método getPropertyName()
    const methodName = `get${capitalize(String(propertyKey))}`;
    if (!target[methodName]) {
      Object.defineProperty(target, methodName, {
        value: function () {
          return this[privateKey];
        },
        enumerable: false,
        configurable: true,
      });
    }

    // Genera un método setPropertyName()
    const setMethodName = `set${capitalize(String(propertyKey))}`;
    if (!target[setMethodName]) {
      Object.defineProperty(target, setMethodName, {
        value: function (value: any) {
          this[privateKey] = value;
        },
        enumerable: false,
        configurable: true,
      });
    }
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export class BaseModel {
  assign<T extends Partial<this>>(data: T): this {
    Object.assign(this, data);
    return this;
  }

  static create<T extends BaseModel, U extends Partial<T>>(this: new () => T, data: U): T {
    const instance = new this();
    return instance.assign(data);
  }
}

