export function dtoHandler<T extends object>(obj: T): T {
  const requiredFields: (keyof T)[] = Object.keys(obj) as (keyof T)[];

  for (const field of requiredFields) {
    if (!(field in obj)) {
      throw new Error(`Missing required field: ${String(field)}`);
    }
  }

  const cleanedData: Partial<T> = { ...obj };

  for (const key in cleanedData) {
    if (cleanedData.hasOwnProperty(key)) {
      if (typeof cleanedData[key] === 'string' && !isNaN(Number(cleanedData[key]))) {
        cleanedData[key as keyof T] = Number(cleanedData[key]) as T[keyof T];
      }
    }
  }

  return cleanedData as T; 
}