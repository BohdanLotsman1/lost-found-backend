import {
    Model, Column, Table, columnTypes, relationTypes,
} from 'nestjs-objection';

import _ from 'underscore';


@Table({ tableName: 'roles' })
export class RoleModel extends Model {

    @Column({ type: columnTypes.increments })
    id: number;

    @Column({ type: columnTypes.string })
    name: string;

    get $secureFields(): string[] {
        return [];
    }

    $formatJson(json) {
        json = super.$formatJson(json);

        return _.omit(json, this.$secureFields);
    }

    static async getRoleIdByName( role: string ) {
        const data = await RoleModel.query().select('id').where('name', role ).first();

        return data?.id;
    }
}
