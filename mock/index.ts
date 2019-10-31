import * as Mock from 'mockjs';
import templates from './templates';

// 只有在 development 环境下会导入 mock
function fake () {
    templates.forEach(template => {
        const url = `/${process.env.MOCK_API}${template.url}`;
        Mock.mock(url, template.type, template.response);
    });
}

export default fake;
