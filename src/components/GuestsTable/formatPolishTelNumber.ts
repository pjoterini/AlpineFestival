export const formatPolishTelNumber = (value: string) => {
  if (value.startsWith('48')) {
    const formattedPhoneNumber = `${value.slice(2, 5)}-${value.slice(
      5,
      8
    )}-${value.slice(8, 11)}`;
    return formattedPhoneNumber;
  } else {
    return value;
  }
};
