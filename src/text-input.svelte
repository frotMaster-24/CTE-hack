<script>
    import {Button, ComboBox, TextArea, TextInput} from "carbon-components-svelte";

    let form_name, form_description, form_unit;
    let product_name = "";
    let prompt_value = "";
    let product_predicted_map = {};

    function getUrlParam(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
    const nid = getUrlParam("nid");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function listToComboBoxList(list) {
        let comboBoxList = [];

        for (let i = 0; i < list.length; i++) {
            if ((list[i] instanceof String) || list[i].length === 0) {
                continue
            }

            comboBoxList.push({id: i, text: capitalizeFirstLetter(list[i])})
        }

        return comboBoxList
    }

    // Отправка POST запроса на сервер
    const createProduct = async (name, description, unit) => {
        // Формирование тела запроса
        const body = JSON.stringify({
            product_full_name: prompt_value,
        });

        fetch(`https://${nid}.ngrok-free.app/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(async (response) => {
            if (response.status !== 200) {
                alert('Ошибка при обработке запроса');
                return;
            }

            product_predicted_map = await response.json();
        }).catch(err => {
            alert('Ошибка при обработке запроса');
        })
    }
</script>

{#if nid}
<div class="block-user-param-cse">
    <div class="auto-create">
        <div class="block-user-param-cse__name">
            <TextInput size="sm" labelText="Наименование" placeholder="Введите наименование товара..." bind:value={prompt_value}/>
        </div>
        <Button on:click={()=>{
                    createProduct(form_name, form_description, form_unit)
                }}
                disabled={!prompt_value || prompt_value.trim().length === 0}
                style="margin-top: 10px;">Автозаполнение</Button>
    </div>

    <div class="products-stats" style="margin-top: 50px;">
        <TextInput bind:value={product_name} labelText="Наименование" placeholder="Введите наименование товара..."/>
        <TextArea labelText="Описание товара" placeholder="Введите описание товара..."/>
    </div>

    {#if Object.keys(product_predicted_map).length === 0}
    <div class="product-stats-default">
        <div class="block-user-param-cse__type-prod">
            <ComboBox
                    titleText="Категория товара"
                    placeholder="Выберите категорию товара"
                    bind:selectedId={form_name}
                    items={[
                  { id: "0", text: "Холодильники" },
                  { id: "1", text: "Лекарства" },
                  { id: "2", text: "Музыкальные инструменты" },
                ]}
            />
        </div>
        <div class="block-user-param-cse__unit">
            <ComboBox
                    titleText="Единица измерения"
                    placeholder="Выберите единицу измерения"
                    bind:selectedId={form_description}
                    items={[
          { id: "0", text: "Шт" },
          { id: "1", text: "Кг" },
          { id: "2", text: "Л" },
        ]}
            />
        </div>

        <div class="block-user-param-cse__gost-classific">
            <ComboBox
                    titleText="Классификация ГОСТ/ТУ"
                    placeholder="Выберите единицу измерения"
                    bind:selectedId={form_unit}
                    items={[
          { id: "0", text: "ГОСТ 12.1.007–76" },
          { id: "1", text: "ГОСТ 26653–85" },
          { id: "2", text: "ГОСТ Р 52495–2005" },
          { id: "3", text: "ГОСТ Р 52249–2004" },
        ]}
            />
        </div>
    </div>
    {/if}

    <!--{JSON.stringify(product_predicted_map)}-->
    <!--{product_predicted_map.length}-->
    {#if Object.keys(product_predicted_map).length > 0}
        <!--{JSON.stringify(product_predicted_map)}-->
        {#each Object.keys(product_predicted_map) as product_property}
            <div class="product_property" style="margin-top: 5px;">
            {#if Array.isArray(product_predicted_map[product_property])}
                <ComboBox
                        titleText={capitalizeFirstLetter(product_property)}
                        placeholder={capitalizeFirstLetter(product_property)}
                        items={listToComboBoxList(product_predicted_map[product_property])}
                        selectedId={0}
                />
            {:else}
                <TextInput size="sm"
                           labelText={capitalizeFirstLetter(product_property)}
                           placeholder={capitalizeFirstLetter(product_property)}
                           value={capitalizeFirstLetter(product_predicted_map[product_property])} />
            {/if}
            </div>
        {/each}
    {/if}
</div>

<Button on:click={()=>{
    alert("Вы успешно сохранили продукт")
}} style="margin-top: 10px;" disabled={
    Object.keys(product_predicted_map).length === 0 && (!product_name || product_name.trim().length === 0)
}
>Сохранить товар</Button>
{:else}
    Добавьте nid ключ в адресную строку для работы приложения
{/if}

<style lang="scss">
    .block-user-param-cse {
        margin-top: 30px;
        max-width: 40%;

        &__type-prod {
            margin-bottom: 10px;
        }

        &__unit {
            margin-bottom: 10px;
        }

        &__gost-classific {
            margin-bottom: 10px;
        }

        &__desc {
            margin-bottom: 10px;
        }
    }

    .block-user-or-ai-param-cse2 {
        margin-left: -33px;
        max-width: 70%;
    }

</style>