const config = {
  screens: {
    Login: {
      path: 'login/:params',
      parse: {
        name: (params: string) => `${params}`,
      },
    },
  },
};

const linking = {
  prefixes: ['telegram://app'],
  config,
};

export default linking;
