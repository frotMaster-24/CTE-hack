<script>
    import { TextInput } from "carbon-components-svelte";
    import { ComboBox } from "carbon-components-svelte";
    import { TextArea } from "carbon-components-svelte";

    import { Grid, Row, Column } from "carbon-components-svelte";
    import { Button } from "carbon-components-svelte";

    // Отправка POST запроса на сервер
    async function createProduct(name, description, unit) {
        // Формирование тела запроса
        const body = JSON.stringify({
            name: name,
            desc: description,
            unit: unit
        });
    
    const response = await fetch('https://acec-35-196-7-8.ngrok-free.app/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });

    // Проверка статуса ответа
    if (!response.ok) {
        throw new Error('Ошибка при создании продукта');
    }

    // Парсинг ответа
    const result = await response.json();
    console.log(result);

    // Возвращаем результат
    return result;
    };

    let form_name, form_description, form_unit;
  </script>
  
  <div class="block-user-param-cse">
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
    <Button on:click={()=>{
        createProduct(form_name, form_description, form_unit)
    }}>Primary button</Button>
    <div class="block-user-param-cse__name">
        <TextInput size="sm" labelText="Наименование" placeholder="Введите наименование товара..." />
    </div>

    <div class="block-user-param-cse__unit">
        <ComboBox
        titleText="Единица измерения"
        placeholder="Выберите единицу измерения"
        bind:selectedId={form_description}
        items={[
          { id: "0", text: "Кг" },
          { id: "1", text: "Шт" },
          { id: "2", text: "Гр" },
        ]}
        />
    </div>
    
    <div class="block-user-param-cse__gost-classific">
        <ComboBox
        titleText="Классификация ГОСТ/ТУ"
        placeholder="Выберите единицу измерения"
        bind:selectedId={form_unit}
        items={[
          { id: "0", text: "1" },
          { id: "1", text: "2" },
          { id: "2", text: "3" },
        ]}
        />
    </div>   

    <div class="block-user-param-cse__desc">
        <TextArea labelText="Описание товара" placeholder="Введите описание товара..." />
    </div>
  </div>

  <div class="block-user-or-ai-param-cse2">
    <Grid>
        <Row>
          <Column> <TextInput labelText="Наименование" placeholder="Enter user name..." /> </Column>
          <Column> <TextInput labelText="Значение" placeholder="Enter user name..." /> </Column>
          <Column> <TextInput labelText="Ед измерения" placeholder="Enter user name..." /> </Column>
        </Row>
    </Grid>
  </div>

  <style lang="scss">
    .block-user-param-cse {
    margin-top: 30px;
        max-width: 40%;
        
        &__type-prod{
            margin-bottom: 10px;
        }

        &__unit{
            margin-bottom: 10px;
        }

        &__gost-classific{
            margin-bottom: 10px;
        }
        
        &__desc{
            margin-bottom: 10px;
        }
    }

    .block-user-or-ai-param-cse2{
        max-width: 70%;
    }

  </style>