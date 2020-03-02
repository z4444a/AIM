export const getMockChangeEvent = (value: string) => {
  return {
    target: {
      value: value,
    },
  };
};

export const getMockKeyPressEvent = (key: string) => {
  return {
    key: key,
    preventDefault: jest.fn().mockName('preventDefault'),
  };
};
