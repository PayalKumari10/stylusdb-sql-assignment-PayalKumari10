const { readCSV } = require('../../src/csvReader');
const { parseSelectQuery } = require('../../src/queryParser');
const { executeSELECTQuery } = require('../../src/queryExecutor');

describe('CSV File Operations', () => {
    test('Read CSV File', async () => {
        // Test reading CSV file
        const data = await readCSV('./student.csv');
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('name');
    });
});

describe('SQL Query Parsing', () => {
    test('Parse SELECT Query', () => {
        // Test parsing SELECT query
        const query = 'SELECT id, name FROM student';
        const parsed = parseSelectQuery(query);
        expect(parsed).toEqual({
            fields: ['id', 'name'],
            table: 'student',
            whereClauses: [],
            joinCondition: null,
            joinTable: null,
            joinType: null,
            groupByFields: null,
            hasAggregateWithoutGroupBy: false,
            orderByFields: null,
            limit: null,
            isDistinct: false,
        });
    });
});

describe('SQL Query Execution', () => {
    test('Execute SELECT Query', async () => {
        // Test executing SELECT query
        const query = 'SELECT id, name FROM student';
        const result = await executeSELECTQuery(query);
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name');
        expect(result[0]).not.toHaveProperty('age');
        expect(result[0]).toEqual({ id: '1', name: 'John' });
    });
});
