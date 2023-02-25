<script lang="ts">
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	export let data: PageData;

	console.log(data);

	let time = format(data?.lastTime, 'HH시 mm분');
</script>

<div class="w-full overflow-y-auto">
	<h1 class="px-8 mt-12">
		<span class="text-2xl font-bold">{data?.departure.name} </span>
		<span class="text-lg">에서</span>
		<br />
		<span class="text-3xl font-bold">{time}</span>
		<span class="text-lg">열차를 타야해요!</span>
	</h1>
	<div class="mt-10 bg-gray-100 mx-4 rounded-lg p-4">
		<div class="flex flex-col">
			<div class="pl-8 border-train-2 border-l-4 relative mx-4 h-[130px]">
				<div class="absolute rounded-full top-0 -left-[0.85rem] bg-train-2 text-white px-2">2</div>
				<div class="flex flex-col w-full h-full justify-between">
					<div class="bg-gray-50 px-4 py-2 rounded-lg">
						<div class="font-bold text-lg">강남역 승차</div>
						<div class="text-red-600 text-sm">00: 00</div>
					</div>
					<div class="px-4 text-gray-500 text-sm">환승 00 분 소요</div>
				</div>
			</div>
			<div class="pl-8 border-train-1 border-l-4 relative mx-4 h-[130px]">
				<div class="absolute rounded-full -top-0 -left-[0.85rem] bg-train-1 text-white px-2">1</div>
				<div class="flex flex-col w-full h-full justify-between">
					<div class="bg-gray-50 px-4 py-2 rounded-lg">
						<div class="font-bold text-lg">신도림역(인천역행) 환승</div>
						<div class="text-red-600 text-sm">00: 00</div>
					</div>
				</div>
			</div>
			<div class="pl-8 mx-4 relative w-full">
				<div
					class="absolute rounded-full -top-0 -left-[0.65rem] bg-train-1 text-white text-[10px] p-1"
				>
					도착
				</div>
				<div class="px-4 text-gray-500 text-sm">00: 00</div>
			</div>
		</div>
	</div>
</div>

<div id="disqus_thread" class="w-full h-96 mt-10" />
