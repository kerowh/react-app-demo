import { createBrowserHistory } from 'history';

// react-app-demo


const ENV = process.env.NODE_ENV;
let publicUrl:string = '';
if(ENV === 'development'){
    publicUrl = '/';
}else if(ENV === 'production'){
    publicUrl = '/react-app-demo';
}
const history = createBrowserHistory({
    basename: publicUrl
});
export default history
