type TypeError = 'Invalid' | 'Required' | 'TooLong';

interface ErrorMessageParams {
  field: string;
  type: TypeError;
}

export const ErrorMessage = ({ field, type }: ErrorMessageParams): string => {
  switch (type) {
    case 'Required':
      return `${field} is required field`;
    case 'Invalid':
      return `${field} is invalid`;
    case 'TooLong':
      return `${field} is too long`;
  }
};
