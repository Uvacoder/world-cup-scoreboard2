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
		ScoreBoard
		<div>
			<pre>{{ scoreBoardFixtures }}</pre>
		</div>
	</div>
</template>
