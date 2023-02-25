<script>
	import '../app.css';
	import 'flowbite/dist/flowbite.css';
	import { Heading } from 'flowbite-svelte';
</script>

<div class="flex flex-col items-center max-w-5xl min-h-screen m-auto">
	<div class="h-20 bg-gray-800 w-full flex justify-center items-center px-4">
		<Heading tag="h1" color="text-white">막차 몇시 ?</Heading>
	</div>
	<slot />
</div>
