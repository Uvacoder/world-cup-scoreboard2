<script>
import { useScoreBoardStore } from '~~/stores/scoreboard.js';
import * as _ from 'lodash';
import * as jsonpatch from 'fast-json-patch';

export default {
	data() {
		return {
			fixture: {
				id: null,
				start_datetime: null,
				participants: [],
				score: []
			},
			scoreBoardStore: useScoreBoardStore()
		};
	},
	methods: {
		createFixture() {
			// Clone a instance of current fixtures list for further manipulation
			let fixture_list_clone = _.cloneDeep(this.scoreBoardStore.fixtures);

			// Prevent adding duplicate fixture.id
			_.remove(fixture_list_clone, (o) => o.id == this.fixture.id);

			// Push new fixture to list
			fixture_list_clone.push(this.fixture);

			// Create json-patch (https://www.rfc-editor.org/rfc/rfc6902)
			const patch = jsonpatch.compare(this.scoreBoardStore.fixtures, fixture_list_clone);

			// Call patch fixtures on store
			this.scoreBoardStore.patchFixtures(patch);
		},
		updateFixture() {
			// Clone a instance of current fixtures list for further manipulation
			let fixture_list_clone = _.cloneDeep(this.scoreBoardStore.fixtures);

			// Find fixture by the provided fixture id
			let fixture = _.find(fixture_list_clone, (o) => o.id == this.fixture.id);

			// Update fixture properties one by one for demonstration purposes
			fixture.start_datetime = this.fixture.start_datetime;
			fixture.participants = this.fixture.participants;
			fixture.score = this.fixture.score;

			// Create json-patch (https://www.rfc-editor.org/rfc/rfc6902)
			const patch = jsonpatch.compare(this.scoreBoardStore.fixtures, fixture_list_clone);

			// Call patch fixtures on store
			this.scoreBoardStore.patchFixtures(patch);
		},
		deleteFixture() {
			// Clone a instance of current fixtures list for further manipulation
			let fixture_list_clone = _.cloneDeep(this.scoreBoardStore.fixtures);

			// Find & Remove fixture by fixture.id
			_.remove(fixture_list_clone, (o) => o.id == this.fixture.id);

			// Create json-patch (https://www.rfc-editor.org/rfc/rfc6902)
			const patch = jsonpatch.compare(this.scoreBoardStore.fixtures, fixture_list_clone);

			// Call patch fixtures on store
			this.scoreBoardStore.patchFixtures(patch);
		}
	}
};
</script>

<template>
	<div>
		<p class="p-8 font-bold text-xl">Operations</p>

		<form class="mx-8">
			<div class="mb-4">
				<label class="block">Fixture ID</label>
				<input class="p-2 w-full text-black focus:outline-none focus:shadow-outline" type="number" v-model="fixture.id" />
			</div>
			<div class="mb-4">
				<label class="block">Start Datetime format: 2022-11-26T01:00:00Z</label>
				<input class="p-2 w-full text-black focus:outline-none focus:shadow-outline" type="text" v-model="fixture.start_datetime" />
			</div>
			<div class="mb-4">
				<label class="block">Participants</label>
				<div class="flex">
					<input class="p-2 mr-2 flex-1 text-black focus:outline-none focus:shadow-outline" type="text" v-model="fixture.participants[0]" />
					<input class="p-2 ml-2 flex-1 text-black focus:outline-none focus:shadow-outline" type="text" v-model="fixture.participants[1]" />
				</div>
			</div>
			<div class="mb-4">
				<label class="block">Score</label>
				<div class="flex">
					<input class="p-2 mr-2 flex-1 text-black focus:outline-none focus:shadow-outline" type="number" v-model="fixture.score[0]" />
					<input class="p-2 ml-2 flex-1 text-black focus:outline-none focus:shadow-outline" type="number" v-model="fixture.score[1]" />
				</div>
			</div>
			<div class="flex items-center justify-between">
				<button class="p-2 bg-slate-500 text-white font-bold focus:outline-none focus:shadow-outline" type="button" @click="createFixture">Create</button>
				<button class="p-2 bg-slate-500 text-white font-bold focus:outline-none focus:shadow-outline" type="button" @click="updateFixture">Update</button>
				<button class="p-2 bg-slate-500 text-white font-bold focus:outline-none focus:shadow-outline" type="button" @click="deleteFixture">Delete</button>
			</div>
		</form>

		<p class="p-8 font-bold text-xl">Debug</p>
		<pre class="mx-8">{{ fixture }}</pre>
	</div>
</template>
