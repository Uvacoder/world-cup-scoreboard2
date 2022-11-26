<script setup>
import { useScoreBoardStore } from '~~/stores/scoreboard.js';
import { storeToRefs } from 'pinia';

const scoreBoardStore = useScoreBoardStore();

// Access state
const { fixtures, scoreBoardFixtures } = storeToRefs(scoreBoardStore);

// Initialize fixture data
await scoreBoardStore.initData();
</script>

<template>
	<div>
		<p class="p-8 font-bold text-xl">ScoreBoard</p>
		<ul class="mx-8 list-none">
			<li v-for="fixture in scoreBoardFixtures" class="mb-2 p-2 bg-slate-500">
				<div class="flex justify-between">
					<div>{{ fixture.participants[0] }}</div>
					<div>{{ fixture.score[0] }}</div>
				</div>
				<div class="flex justify-between">
					<div>{{ fixture.participants[1] }}</div>
					<div>{{ fixture.score[1] }}</div>
				</div>
				<div>{{ fixture.start_datetime }}</div>
			</li>
		</ul>

		<p class="p-8 font-bold text-xl">Debug</p>
		<pre class="mx-8">{{ scoreBoardFixtures }}</pre>
	</div>
</template>
