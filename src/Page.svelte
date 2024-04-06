<script>
	import { Button, Content,
		Grid,
		Row,
		Column,
    } from "carbon-components-svelte";

    export let name = "test";
</script>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.da {
		margin-top: 240px;
		margin-left: 500px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

    .welcome {
        &__title {
        }

        &__description {
            margin-top: 10px;
        }

        &__submit {
            margin-top: 20px;
        }
    }

    
</style>