interface IMessage {
  translating: string;
  translationIs: string;
}

interface IMessages {
  [key: string]: IMessage;
}

// Mensajes en diferentes idiomas
const messages: IMessages = {
  'English': {
    'translating': '\nTranslating... Please wait.',
    'translationIs': '\n-> The translation is:',
  },
  'Español': {
    'translating': '\nTraduciendo... Por favor, espere.',
    'translationIs': '\n-> La traducción es:',
  }
};

export default messages;