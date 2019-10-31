import chalk from 'chalk';

type TypeLog = 'Info' | 'Notify' | 'Error';

interface LogParams {
  type: TypeLog;
  message: string;
}

export default ({ type, message }: LogParams) => {
  const log = console.log;
  switch (type) {
    case 'Info':
      return log(chalk.blue(message));
    case 'Notify':
      return log(chalk.green(message));
    case 'Error':
      return log(chalk.red(message));
  }
};
