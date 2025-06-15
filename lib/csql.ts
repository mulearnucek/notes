import _ from 'lodash';

export class CSQL {
  constructor(private data: any[]) {}

  where(conditions: Record<string, any>) {
    return _.filter(this.data, conditions);
  }

  select(columns: string[]) {
    return this.data.map(row => _.pick(row, columns));
  }

  sum(column: string) {
    return _.sumBy(this.data, column);
  }

  avg(column: string) {
    return _.meanBy(this.data, column);
  }

  count(column?: string) {
    return column ? _.countBy(this.data, column) : this.data.length;
  }

  distinct(column: string) {
    return _.uniq(this.data.map(row => row[column]));
  }

  distinctBy(columns: string | string[]) {
    if (typeof columns === 'string') {
      return _.uniqBy(this.data, columns);
    }

    return _.uniqBy(this.data, (row) => 
      columns.map(col => row[col]).join('|')
    );
  }

  query(operations: {
    where?: Record<string, any>;
    select?: string[];
    orderBy?: string;
    order?: 'asc' | 'desc';
    limit?: number;
    distinct?: string | string[];
  }) {
    let result = this.data;

    if (operations.where) {
      result = _.filter(result, operations.where);
    }

    if (operations.select) {
      result = result.map(row => _.pick(row, operations.select!));
    }

    if (operations.distinct) {
        result = _.uniqBy(result, operations.distinct);
    }

    if (operations.orderBy) {
      result = _.orderBy(result, [operations.orderBy], [operations.order || 'asc']);
    }

    if (operations.limit) {
      result = _.take(result, operations.limit);
    }

    return result;
  }
}