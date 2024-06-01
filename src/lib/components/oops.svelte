<script>
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

    export let themesCSS
    export let oldUI
</script>

<div class="w-[32rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
	<h5 class="text-3xl font-bold {themesCSS}">OOPS!</h5>
    <form class="space-y-6 w-[25rem]">
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <h3> it seems like this hasn't been created yet!</h3>
        </div>				
    </form>
</div>

