import { mock } from 'root/mock/templates/mock-helper';
import { Random, mock as Mock } from 'mockjs';

export const environments = mock({
    url: '/srm/environments',
    type: 'get',
    response: () => {
        return {
            code: 20000,
            data: Mock({
                'list|10': [
                    {
                        'id|10-1000000': 3434,
                        'name|1': () => Random.region() + Random.county(true),
                        'name_nc|1': () => Random.region() + Random.county(true)
                    }
                ]
            })
        };
    }
});

export const updateTypes = mock({
    url: '/srm/update-types',
    type: 'get',
    response: () => {
        return {
            code: 20000,
            data: [
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
        };
    }
});

export const modules = mock({
    url: '/srm/modules',
    type: 'get',
    response: () => {
        return {
            code: 20000,
            data: Mock({
                'array|10': {
                    id: () => Random.id(),
                    'name|1': () => Random.name(),
                    notes: () => Random.character()
                }
            })
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
