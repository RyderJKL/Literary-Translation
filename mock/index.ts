import * as Mock from 'mockjs';
import templates from './templates';

const mockApi = 'mock-api';

function start () {
    templates.forEach(template => {
        const url = `/${mockApi}${template.url}`;
        console.log(url);
        Mock.mock(url, template.type, template.response);
    });
}

export default start;
