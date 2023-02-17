<script lang="ts">
	import { Heading, Button, P } from 'flowbite-svelte';
	import Select from 'svelte-select';

	let items = [
		{ value: '강남역', label: '강남역' },
		{ value: '선릉역', label: '선릉역' },
		{ value: '합정역', label: '합정역' },
		{ value: '시청역', label: '시청역' },
		{ value: '을지로3가역', label: '을지로3가역' }
	];
</script>

<div class="flex flex-col items-center max-w-5xl min-h-screen m-auto">
	<div class="h-20 bg-gray-800 w-full flex justify-center items-center px-4">
		<Heading tag="h1" color="text-white">막차 몇시 ?</Heading>
	</div>

	<form class="w-full px-4" method="POST" action="/last-time">
		<div class="py-6 w-full mb-4 flex flex-col gap-7">
			<Select
				{items}
				name="departure"
				placeholder="출발역 (2호선만 가능해요)"
				class="h-14 !text-gray-900 !bg-gray-50 !border-gray-300"
				inputStyles="--tw-ring-color: transparent;"
			>
				<div slot="prepend" class="mr-1">
					<svg class="w-6 h-6" fill="#6b7280" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/></svg
					>
				</div>

				<div slot="empty" class="p-3 text-center">역이 없습니다.</div>

				<div slot="item" let:item>
					{item.label}
					<span class="rounded-full bg-[#00A84D] text-white px-1 text-sm align-text-top">2</span>
				</div>

				<div slot="selection" let:selection>
					{selection.label}
					<span class="rounded-full bg-[#00A84D] text-white px-1 text-sm align-text-top">2</span>
				</div>
			</Select>
			<Select
				{items}
				name="arrival"
				placeholder="도착역"
				class="h-14 !text-gray-900 !bg-gray-50 !border-gray-300"
				inputStyles="--tw-ring-color: transparent;"
			>
				<div slot="prepend" class="mr-1">
					<svg class="w-6 h-6" fill="#6b7280" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/></svg
					>
				</div>

				<div slot="empty" class="p-3 text-center">역이 없습니다.</div>

				<div slot="item" let:item>
					{item.label}
					<span class="rounded-full bg-[#00A84D] text-white px-1 text-sm align-text-top">2</span>
				</div>

				<div slot="selection" let:selection>
					{selection.label}
					<span class="rounded-full bg-[#00A84D] text-white px-1 text-sm align-text-top">2</span>
				</div>
			</Select>
		</div>
		<Button class="w-full" color="dark" size="xl" type="submit">
			<P size="base" color="text-white" space="wide">막차 몇시?</P>
		</Button>
	</form>
</div>
