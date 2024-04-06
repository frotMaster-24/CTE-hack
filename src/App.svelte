<link rel="stylesheet" href="https://unpkg.com/carbon-components/css/carbon-components.min.css">

<script>
	import { Content } from "carbon-components-svelte";
    import Header from "./Header.svelte";

	export let name;

	import { Button} from "carbon-components-svelte";
    import TextInputName from "./text-input.svelte";


</script>

<Header></Header>

<Content>
	<TextInputName></TextInputName>
</Content>