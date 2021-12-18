interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'sendGrid';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@layback.me',
      name: 'Equipe Layback',
    },
  },
} as IMailConfig;
