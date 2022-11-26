<script>
export default {
	data() {
		return {
			fixture: {
				id: null,
				start_datetime: null,
				participants: [],
				score: []
			}
		};
	},
	methods: {
		create() {
			console.log('create', this.fixture);
		},
		update() {
			console.log('update', this.fixture);
		},
		delete() {
			console.log('delete', this.fixture);
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
				<button class="p-2 bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline" type="button" @click="create">Create</button>
				<button class="p-2 bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline" type="button" @click="update">Update</button>
				<button class="p-2 bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline" type="button" @click="delete">Delete</button>
			</div>
		</form>

		<p class="p-8 font-bold text-xl">Debug</p>
		<pre class="mx-8">{{ fixture }}</pre>
	</div>
</template>
