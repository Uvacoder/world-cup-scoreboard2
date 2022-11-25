<script setup>
import { useScoreBoardStore } from '~~/stores/scoreboard.js';
import { storeToRefs } from 'pinia';

const scoreBoardStore = useScoreBoardStore();

// Access state
const { fixtures } = storeToRefs(scoreBoardStore);

await scoreBoardStore.initData();
</script>

<template>
	<div>
		ScoreBoard
		<div>
			<pre>{{ fixtures }}</pre>
		</div>
	</div>
</template>
