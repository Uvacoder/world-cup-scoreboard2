import { setActivePinia, createPinia } from 'pinia';
import { describe, test, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { useScoreBoardStore } from './stores/scoreboard.js';
import * as _ from 'lodash';
import * as jsonpatch from 'fast-json-patch';

beforeAll(() => {
	setActivePinia(createPinia());
});

describe('ScoreBoard Store', () => {
	let store;

	beforeEach(() => {
		store = useScoreBoardStore();
	});

	afterAll(() => {
		store.$reset();
	});

	/**
	 * Test state initialization
	 */
	test('Store is defined', () => {
		expect(store).toBeDefined();
	});

	/**
	 * Check if we can access state property
	 */
	test('Fixtures are empty', () => {
		expect(store.fixtures).toStrictEqual([]);
	});

	/**
	 * Test data initialization
	 */
	test('Data initialization', async () => {
		await store.initData();
		expect(store.fixtures.length).toBeGreaterThan(0);
	});

	/**
	 * Test adding fiture data to state
	 */
	test('Set fixtures', () => {
		store.$reset();
		store.setFixtures([
			{
				id: 1,
				start_datetime: '2022-11-24T01:00:00Z',
				participants: ['TeamA', 'TeamB'],
				score: [1, 0]
			},
			{
				id: 2,
				start_datetime: '2022-11-24T02:00:00Z',
				participants: ['TeamC', 'TeamD'],
				score: [0, 1]
			},
			{
				id: 3,
				start_datetime: '2022-11-24T03:00:00Z',
				participants: ['TeamE', 'TeamF'],
				score: [2, 2]
			}
		]);

		expect(store.fixtures.length).toBe(3);
	});

	/**
	 * Test scoreboard getter
	 */
	test('ScoreBoard getter', () => {
		expect(store.scoreBoardFixtures.length).toBe(3);
	});

	/**
	 * Test add fixture to state
	 */
	test('Add fixture', () => {
		let fixture_list_clone = _.cloneDeep(store.fixtures);

		fixture_list_clone.push({
			id: 4,
			start_datetime: '2022-11-24T03:00:00Z',
			participants: ['PAOK', 'ARIS'],
			score: [4, 0]
		});

		const patch = jsonpatch.compare(store.fixtures, fixture_list_clone);

		store.patchFixtures(patch);

		expect(store.fixtures.length).toBe(4);
	});

	/**
	 * Test remove fixture from state
	 */
	test('Remove fixture', () => {
		let fixture_list_clone = _.cloneDeep(store.fixtures);

		_.remove(fixture_list_clone, (o) => o.id == 4);

		const patch = jsonpatch.compare(store.fixtures, fixture_list_clone);

		store.patchFixtures(patch);

		expect(store.fixtures.length).toBe(3);
	});

	/**
	 * Test edit fixture from state
	 */
	test('Edit fixture', () => {
		let fixture_list_clone = _.cloneDeep(store.fixtures);

		let fixture = _.find(fixture_list_clone, (o) => o.id == 3);
		fixture.score = [4, 4];

		const patch = jsonpatch.compare(store.fixtures, fixture_list_clone);

		store.patchFixtures(patch);

		expect(store.fixtures[2].score).toStrictEqual([4, 4]);
	});

	/**
	 * Ensure scoreboard getter sorting when score is equal
	 */
	test('ScoreBoard score equality getter sorting', () => {
		expect(store.scoreBoardFixtures[2].participants).toStrictEqual(['TeamA', 'TeamB']);
	});

	/**
	 * Ensure scoreboard getter sorting most total goals
	 */
	test('Scoreboard total score getter sorting', () => {
		expect(store.scoreBoardFixtures[0].participants).toStrictEqual(['TeamE', 'TeamF']);
	});
});
