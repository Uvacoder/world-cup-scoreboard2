import { defineStore } from 'pinia';
import _ from 'lodash';
import jsonpatch from 'fast-json-patch';

export const useScoreBoardStore = defineStore('scoreBoard', {
	state: () => ({
		fixtures: []
	}),

	getters: {
		// Order fixtures by score sum desc, and start datetime asc (most goals & start datetime)
		scoreBoardFixtures: (state) => {
			return _.orderBy(
				state.fixtures,
				[
					(o) => {
						return _.sum(o.score);
					},
					(o) => {
						return o.start_datetime;
					}
				],
				['desc', 'desc']
			);
		}
	},

	actions: {
		// Set fixtures snapshot
		setFixtures(payload) {
			this.fixtures = payload;
		},
		// Patch fixtures (https://www.rfc-editor.org/rfc/rfc6902)
		patchFixtures(payload) {
			jsonpatch.applyPatch(this.fixtures, payload);
		},
		// Initialize data (maybe connect to a service and get initial snapshot)
		async initData() {
			let fitures_payload = [
				{
					id: 1,
					start_datetime: '2022-11-24T01:00:00Z',
					participants: ['Mexico', 'Canada'],
					score: [0, 5]
				},
				{
					id: 2,
					start_datetime: '2022-11-24T02:00:00Z',
					participants: ['Spain', 'Brazil'],
					score: [10, 2]
				},
				{
					id: 3,
					start_datetime: '2022-11-24T03:00:00Z',
					participants: ['Germany', 'France'],
					score: [2, 2]
				},
				{
					id: 4,
					start_datetime: '2022-11-24T04:00:00Z',
					participants: ['Uruguay', 'Italy'],
					score: [6, 6]
				},
				{
					id: 5,
					start_datetime: '2022-11-24T05:00:00Z',
					participants: ['Argentina', 'Australia'],
					score: [3, 1]
				}
			];

			this.setFixtures(fitures_payload);
		}
	}
});
