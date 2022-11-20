import development from './development.config';
import production from './production.config';

const config = {};
switch(process.env.NODE_ENV){
    case 'development':
        Object.assign(config, development);
        break;
    case 'production':
        Object.assign(config, production);
        break;
    case 'production':
        Object.assign(config, production);
        break;
}

export default config;