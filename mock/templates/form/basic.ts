import { mock } from 'root/mock/templates/mock-helper';
import { Random, mock as Mock } from 'mockjs';

export const environments = mock({
    url: '/form/basic/environments',
    type: 'get',
    response: () => {
        return {
            code: 20000,
            data: Mock({
                'list|5': [
                    {
                        id: () => Random.id(),
                        name: () => Random.province()
                    }
                ]
            })
        };
    }
});

export const updateTypes = mock({
    url: '/form/basic/update-types',
    type: 'get',
    response: () => {
        return {
            code: 20000,
            data: {
                list: [
                    'bug修复',
                    '配置修改',
                    '版本升级',
                    '应用上线',
                    '性能优化',
                    'ansible修改',
                    '服务扩容',
                    '自动化测试',
                    '数据操作'
                ]
            }
        };
    }
});

export const modules = mock({
    url: '/form/basic/modules',
    type: 'get',
    response: () => {
        return {
            code: 20000,
            data: {
                list: [
                    { id: '1', name: '数据治理' },
                    { id: '2', name: '机器学习' },
                    { id: '3', name: '标签系统' }
                ]
            }
        };
    }
});

export const basicForm = mock({
    url: '/form/basic',
    type: 'post',
    response: (req) => {
        const { body } = req;

        console.log(body);

        return {
            code: 20000,
            message: '添加成功呢!'
        };
    }
});
