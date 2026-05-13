const { MessageEmbed, Message } = require("discord.js");
const { getRandomInt, elemAleatorio, miembroAleatorio } = require("../../arlutils");

module.exports = {
    name: 'comer',
    description: '¿Que vamos a comer hoy?',
    hide: false,
    execute: exec
};

COMIDAS = [
    [
        'Pizza cumpleaños',
        [
            'Perfecto para los pizzeros cumpleañeros',
            '¡Feliz cumpleaños!',
            '¿Prefieres esto para tu cumpleaños?'
        ], 
        [
            'https://cdn.discordapp.com/attachments/957718927138504744/971365919743950888/unknown.png'
        ]
    ],
    [
        'Sushi',
        [
            'Una delicia de japón',
            'Rollo de arroz con centro comúnmente de pescado crudo, entre otros',
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1104476846260760708/mejores_restaurantes_de_sushi_en_guadalajara_409_orig.png']
    ],
    [
        'Hormigas Culonas',
        [
            'Al parecer, se comen fritas y aseguran que tienen un sabor similar al maní. ¿Se atreven a probarlas?',
            'No sé, tengo miedo de que me muerdan, aunque no están vivas',
            '¿Hormigas Qué? No gracias',
            'Hormigas fritas',
            '¿Qué?'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1104477727731486730/raro.png']
    ],
    [
        'Pollo Asado',
        [
            'Sin duda de la mejor carne de ave',
            'Que bien sabe el pollo asado',
            '¿Qué parte del pollo prefieres?',
            'Una deliciosa ave asada'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1104479052498206781/Pollo-Asado-al-Horno-696x398.png']
    ],
    [
        'Pozole Rojo de Puerco',
        [
            'Pozole estilo Jalisco, platillo mexicano de excelencia',
            'Granos de maiz cocido en caldo con carne de puerco',
            'Perfecto para cualquier hora del día'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1104483399747522590/450_1000.png']
    ],
    [
        'Hamburguesa',
        [
            'Comida alemana o estadounidense a base de carne y condimentos. Todo una delicia mala para el corazón',
            'Básicamente un sandwich de carne',
            'Una grán comida con deliciosa carne de procedencia sospechosa'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1104484338118180934/CCD5ZHAGZJFVJJFQPLLI3BDB4E.png']
    ],
    [
        'Causa Rellena',
        [
            'Platillo de papa amarilla relleno con distintos ingredientes característico de Perú',
            '¿Pe causa?',
            'La comida más popular de Perú',
            'Platilllo peruano de excelencia',
            'Un platillo delicioso y llamativo en una base de papa conteniendo carne y otros ingredientes'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1106320016200188014/Receta-de-causa-rellena-limena-Comidas-Peruanas.jpg']
    ],
    [
        'Papa Rellena',
        [
            'Deliciosa papa rellena con carne',
            'Hoy comeremos la deliciosa papa rellena',
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108865149760176179/papa-rellena-de-carne_800x533-720x480.jpg']
    ],
    [
        'Omelet',
        [
            'Huevo revuelto al que se le da forma de tortilla con un relleno de distintos ingredientes, comúnmente jamón',
            'El desayuno perfecto',
            'Delicioso platillo francés de huevo y jamón'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108866196679434330/Receta-de-omelette.jpg']
    ],
    [
        'Empanadas',
        [
            'Empanadas',
            'Delicioso pan relleno comúmente con carne',
            'Empanadas',
            'Empanadas',
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108866889339383889/images_8.jpg']
    ],
    [
        'Sopa de Macaco',
        [
            'Uma delicia',
            'Sopa do macaco, uma delicia',
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108867408636166194/images_9.jpg']
    ],
    [
        'Lasaña',
        [
            'Laminas de pasta intercaladas en ingredientes al gusto, comúnmente carne',
            'Deliciosa comida italiana con pasta y carne',
            'Comida favorita de Garfield',
            'Deliciosa combinación de pasta, carne y queso',
            'Carne, pasta, queso y diferentes condimentos. ¿Qué puede ser mas delicioso?'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108868225514614914/232080.jpg']
    ],
    [
        'Enchiladas Rojas',
        [
            'Tortillas enrrolladas en ingredientes al gusto, bañadas en salsa picante o de tomate',
            'Deliciosas tortillas bañadas en salsa, con ingredientes al gusto, comúnmente pollo',
            '¿Tacos pero bañados en salsa?',
            'No te dejes intimidar por su nombre, no suelen ser tan enchiladas'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108868885823881346/images_11.jpg']
    ],
    [
        'Arroz con Leche',
        [
            'Dulce y delicioso arroz con leche',
            'Un postre nocturno perfecto',
            'Arroz en leche condensada, de sabor dulce. Se le suele añadir canela',
            'Hoy servimos un dulce arroz con leche'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108869960555577454/images_12.jpg']
    ],
    [
        'Carne Asada',
        [
            'Carne asada, acompañada con diferentes ingrdientes cómo papas, cebolla, rábano, entre otras verduras',
            '¿Se va hacer? o ¿No se va hacer? la carnita asada',
            'Carne asada al estilo popular del norte de México'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108871643553599569/Tacos-de-Carne-asada-estilo-Sinaloa-Como-hacer-la-receta-paso-a-paso-768x432.jpg']
    ],
    [
        'Sandwich',
        [
            'Sandwich',
            'Dos piezas de pan de molde que lleva comúnmente jamón, lechuga y queso',
            'Tiene tantos estilos ¿Cuál es el tuyo?',
            'Puedes llevartelo a donde sea',
            'Pan con jamón, lechuga y queso',
            'Hoy vamos a comer un delicioso sandwich'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108872254542074006/images_13.jpg']
    ],
    [
        'Sopa Maruchan',
        [
            'Sopa instantánea ¡Hecha en 3 minutos!',
            'Pasta instantánea remojada en agua hervida con diferentes condimentos',
            '¿Maru-chan?',
            'Maruchan'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108873095588098099/Una_de_las_versiones_de_la_sopa_Maruchan_es_la_que_quitarian_del_mercado.png']
    ],
    [
        'Guiso',
        [
            'Hice Guiso',
            'Carne guisada y pasta',
            'Deliciosa carne guisada con ingredientes al gusto'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108873642512748614/goulash-noodles-eat-food-thumbnail-1.jpg']
    ],
    [
        'Pollo Teriyaki',
        [
            'Delicioso platillo japonés de arroz, pollo y verduras',
            'Sus diferentes sabores suaves lo hacen tán disfrutable',
            'Una delicia de japón',
            'Pollo, arroz y diferentes verduras'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108874527733207040/images_14.jpg']
    ],
    [
        'Costillas de Cerdo BBQ',
        [
            'Deliciosas costillas de cerdo bañadas en salsa BBQ',
            'Una delicia estadounidense',
            'En paz descanse el cerdo de estas deliciosas costillas',
            'Deliciosa comida estadounidense de costillas de cerdo a la parrilla bañadas en salsa BBQ'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108874922970857482/como_hacer_costillas_bbq_en_sarten_50593_600.webp']
    ],
    [
        'Cereal con Leche',
        [
            'Que desayuno',
            'Simple cereal del supermercado bañado en leche',
            'Ya comí esto ayer',
            'Un buen desayuno',
            'Hoy comeremos cereal con leche'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108876917643427912/cereal-y-leche-de-desayuno-5469244.jpg']
    ],
    [
        'Filete de Pescado',
        [
            'Un delicioso trozo de pescado cocinado y acompañado con ensalada y condimentos',
            'Esperemos el cocinero haya retirado bien las espinas',
            'Sin duda de los mejores platillos de mariscos',
            'Perfecto para la cuaresma',
            'Filete de pescado acompañado con ensalada'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108877797310611547/filete-pescado-verduras.jpg']
    ],
    [
        'Medallones de Atún en Salsa',
        [
            'Atún',
            'Fresco y deliciosó medallón de atún en salsa acompañado de ensalada y arroz',
            'Una comida sabrosa de atún',
            'De las mejores preparaciones del atún'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108878508740063252/images_15.jpg']
    ],
    [
        'Tostilocos',
        [
            'Una épica preparación de frituras con una explosion de sabores salados, enchilosos, y ácidos',
            'Una delicia del norte de México',
            'Frituras de maiz preparadas en chile, limón, cacahuates, pepino y diferentes ingredientes salados y ácidos',
            'Épica explosión de sabores salados, enchilosos y ácidos, no apto para estomagos débiles',
            'Ya no siento la lengua, y ni tengo una'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108878915155529738/images_16.jpg']
    ],
    [
        'Nachos',
        [
            'Trozos de tortilla frita cubiertos con queso, chile y guacamole',
            'La botana perfecta para las fiestas',
            'Hoy comeremos unos deliciosos nachos',
            'Tortilla frita perfectamente acompañable con queso, guacamole, salsa ó chile entre otros'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108879423203180654/images_17.jpg']
    ],
    [
        'Ancas de Rana',
        [
            'Pensar que esto alguna vez fue una feliz rana saltarina',
            'Dicen que sabe a pollo',
            'Deliciosas ancas de rana',
            'La carne de reptil favorita de muchos'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108879955439386644/images_18.jpg']
    ],
    [
        'Alitas de Pollo',
        [
            'De las mejores preparaciones amercanas del pollo',
            'No solo son alitas, y son deliciosas',
            'Esto te alegrara el día',
            'Delicioso pollo con una salsa agridulce',
            'Estas alitas hacen volar a tu lengua'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108880368590934036/aitas-de-pollo-a-la-americana-o-buffalo-wings-t.jpg']
    ],
    [
        'Huevo Revuelto',
        [
            'Un desayuno perfecto',
            'La preparación del huevo favorita de muchos',
            'Un delicioso huevo revuelto cocinado'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108880645578571786/huevos-revueltos-desayuno-700x499.webp']
    ],
    [
        'Huevo Estrellado',
        [
            'Preparado de forma que la yema queda en el centro rodeada por la clara de huevo',
            'Perfecto desayuno, sobre todo acompañado con tocino',
            'La preparación del huevo favorita de muchos',
            'Un huevito estrellado para comenzar el día'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108880913883992064/images_19.jpg']
    ],
    [
        'Grasa',
        [
            '¿Para que complicarse? mejor ingerirla directamente',
            '¿Eh? Provecho',
            '¿Porqué conseguirla de otras comidas cuando puedes ingerirla directamente?',
            'Yo prefiero quemarla. ¿Tú no?'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108881541112803461/images.jpg']
    ],
    [
        'Comida de Gato',
        [
            'Hoy comerás comida de gato, no había otra cosa',
            '¡Miau!',
            'Soy un gato ¡Miau!',
            '¿Eh?',
            'Que bien come el gato ¿no?',
            '¿Pero qué?',
            'Raul'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108884934044692510/images_21.jpg']
    ],
    [
        'Comida de Perro',
        [
            '¿Eh?',
            'Woof',
            '¡Awooooo!',
            'Guau',
            'Hoy comerás comida de perro, no había otra cosa',
            'Soy un perro ¡Guau!',
            'Woof, woof, awooo',
            '¿Pero qué?'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1108885501466914866/images_22.jpg']
    ],
    [
        'Fruta picada',
        [
            'Dulce y ligera',
            'Diversidad de frutas cortadas en cuadritos',
            'Sencilla variedad de frutas picadas'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1109281587184541747/WEB.png']
    ],
    [
        'Caldo de pollo',
        [
            'Sabe realmente bien los días frios',
            'Caldo con pollo y verduras cocidas',
            'Un caldo delicioso y revitalizante'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1109282854610948156/117229.png']
    ],
    [
        'Pasta Alfredo',
        [
            'Pasta bañada en una salsa de queso parmesano y diferentes especias y condimentos',
            'Comida italiana de pasta bañada en salsa alfredo',
            'Una deliciosa comida italiana de pasta y salsa alfredo'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1110412979301797939/pasta-alfredo.png']
    ],
    [
        'Tamales',
        [
            'Un alimento a base de masa de maíz relleno de carnes, verduras, salsas y hasta endulzantes',
            'Una deliciosa masa de maíz rellena de distintos ingredientes',
            'Pueden ser salados, dulces, amargos, ácidos. como te gusten'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1110414227639914536/Tamales-750x483.png']
    ],
    [
        'Arepas',
        [
            'Un alimento a base de masa de maíz seco relleno con distintos ingredientes, que suele ser carne',
            'Un grán alimento venezolano a base masa de maiz relleno con ingredientes al gusto',
            'Definitivamente una delicia de masa de maiz ¿Cuantas te comes?'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1110416577762967623/650_1200.png']
    ],
    [
        'Pizza',
        [
            'Delicioso y popular pan plano de harina de trigo horneado cubierto con salsa de tomate y queso mozzarella',
            'La mejor comida italiana',
            'Una delicia itialiana de pan, queso y salsa de tomate'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111097232117219348/151_1stuffed_crust_pizza.jpg']
    ],
    [
        'Pizza Hawaiana',
        [
            'Pizza con piña y jamón',
            'Pizza con piña',
            'La deliciosa pizza a la que le pusieron piña y jamón',
            'Curiosamente no proviene de hawiai'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111097297003098182/OIP.jpg']
    ],
    [
        'Ramen',
        [
            'Un plato principalmente de fideos japoneses con distinos ingredientes',
            'Una delicia de japón ó china',
            'Deliciosos fideos servidos en un caldo de pollo o cerdo'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111097821123330129/R.jpg']
    ],
    [
        'Roles de Canela',
        [
            'Rollos de pan adicionados con canela y un glaseado',
            'Dulce rollo de maza, canela y azucar horneados',
            'Quedan muy bien con un chocolate caliente'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111097976601976912/R_1.jpg']
    ],
    [
        'Cuy Asado',
        [
            'Cuy asado\n\ncon papas',
            'Receta peruana que consiste en un cuy ó conejillo de indias asado, acompañado con papas',
            'Una delicia peruana',
            'Creo que era mi mascota :('
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111098501246492672/cuy-asado-con-papas.jpg']
    ],
    [
        'Tacos',
        [
            'Una tortilla que envuelve diferentes ingredientes al gusto adicionados con salsa, chile, verdura y otros condimentos',
            'La comida mas popular de México',
            'Una tortilla de maiz envolviendo una grán diversidad de ingredientes, adicionado comúnmente con chile',
            '¡Tacos!'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111098825352937502/OIP_1.jpg']
    ],
    [
        'Chapulines',
        [
            'El famoso insecto que salta, ya no salta',
            'Sin duda una comida que hará saltar a muchos',
            'Chapulines cocinados adicionados con otros ingredientes',
            'Una muy buena fuente de proteína'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111100001565810799/OIP_2.jpg']
    ],
    [
        'Avena',
        [
            'Deliciosa avena, puedes comerla cruda, preparada ó cocida',
            'Una grán comida para iniciar el día',
            'Ayuda a reducir el colesterol'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111115279955656784/R.webp']
    ],
    [
        'Suströmming',
        [
            'Arenque enlatado fermentado que puede liberar un olor fuerte',
            'Un pez feremntado que biene comúnmente en lata',
            'Dicen que sabe bien, pero su olor no es agradable'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111150377220452413/surstromming.jpg']
    ],
    [
        'Pastel de Carne',
        [
            'Platillo de carne picada y pan en una forma rectangular',
            'Pastel de carne picada',
            '¿Feliz Cumpleaños?'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111786346676232234/125054.png']
    ],
    [
        'Croqueta',
        [
            'Nunca se sabe que tiene dentro',
            'Crujiente por fuera, suave por dentro',
            'Platillo francés que consiste en una masa frita que dentro contiene deviersos ingredientes'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111787277564268544/croquetas-caseras.png']
    ],
    [
        'Croqueta',
        [
            'Nunca se sabe que tiene dentro',
            'Crujiente por fuera, suave por dentro',
            'Platillo francés que consiste en una masa frita que dentro contiene deviersos ingredientes'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111787277564268544/croquetas-caseras.png']
    ],
    [
        'Gazpacho',
        [
            'Platillo de excelencia española, la cual es una sopa fría con varios ingredientes cómo tomate, aceite, agua y vinagre',
            'Una sopa fria de españa',
            'Una sopa fría con varios ingredientes como aceite, vinagre, tomate, agua, ortalizas crudas, pimientos y ajo'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111788184062406727/i.png']
    ],
    [
        'Pollo Frito',
        [
            'Pollo frito',
            'Un pollo crujiente',
            'Un pollo frito que puede venir empanizado'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111789035439005737/JZ5ZYA7IJJBKFCG44JGQOQH6S4.png']
    ],
    [
        'Pavo al Horno',
        [
            'La tradicional cena de los días festivos',
            'Un grán pavo horneado',
            'Un delicioso grán pavo que suele comerse en los días festivos como navidad o acción de gracias'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111789864145387600/recetas-de-pavo.png']
    ],
    [
        'Paella',
        [
            'Un platillo español de arroz y algunos mariscos',
            'Una delicia de arroz y mariscos',
            'Una delicia de la comida española'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111790006248423545/876038bcd1cf5abcaa28e86d9705eaf6.png']
    ],
    [
        'Caviar',
        [
            'Un lujo de procedencia dudosa',
            'Huevas del pez esturión con sal',
            'Basicamente huevos de un pez llamado esturión'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111790421090238565/PHLAEKOP6ZCCFGEVWLWQ4WBGVI.png']
    ],
    [
        'Waffles',
        [
            'Entre pan o galleta, se les suele añadir ingredientes dulces y salados',
            'Perfectos para el desayuno, sobre todo con nutella',
            'Perfectos para el desayuno',
            'Una masa esponjosa que se puede combinar con casi todo',
            '¡Waffles!'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111791664466493450/6387dc4ab3d2b8d8efac04263d4fd77f.png']
    ],
    [
        'Magnifi-carne',
        [
            'Se dice que solo sale cada 100 años'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111792638371311666/250.png']
    ],
    [
        'Estofado Sospechoso',
        [
            'Se ve sospechoso ¿Lo comerás?',
            'Me encontré esto'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111793659902431252/latest.png']
    ],
    [
        'Higado Encebollado',
        [
            'Higado de res o de cerdo cocinado',
            'Una grán fuente de proteína y hierro',
            'Puede tener un sabor fuerte'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111794300666261535/image.png']
    ],
    [
        'Sardinas',
        [
            'Un famoso pez, puede ser una delicia preparado correctamente',
            'Un buen pez que suele venir enlatado',
            'Muchos platillos deliciosos pueden salir de este pez'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111794550961348701/3ee626d5b1065067de882649d3c745c8a7f73f58.png']
    ],
    [
        'Pay',
        [
            'Una delicia con diversos sabores e ingredientes distintos',
            'Una clase de plato hecho de de pan horneado relleno con diversos ingredientes dulces y salados',
            'Pueden ser dulces ó salados y seguir siendo una delicia'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111795048963653732/cherry-pie-delizia.png']
    ],
    [
        'Fideos Frios',
        [
            'Fideos estilo coreano servidos en un caldo frio',
            'Un buen platillo de fideos en un caldo frio',
            'A diferencia de muchos platillos, este se come frio'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111795592310571138/600d65e874aae2a6145f5a014cc78a32.png']
    ],
    [
        'Wontón',
        [
            'Una comida china la cual es una masa como una bolsa fina y rellena con carne y salsa agridulce',
            'Una bolsa de masa rellena de carne y salsa agridulce',
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111796074898796634/wontons_176389079-min-aspect-ratio-782-521.png']
    ],
    [
        'Banderilla',
        [
            'Una salchicha envuelta en masa de trigo firita',
            'Salchicha de pavo envuelta en masa frita, suele acompañarse con kétchup y mostaza',
            'Una deliciosa preparacíon de salchicha'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111796283309559808/receta-banderilla.png']
    ],
    [
        'Salchipapas',
        [
            'Una comida de rodajas de salchicha y papas fritas',
            'La preparación perfecta de salchichas y papas fritas',
            'Me comí una salchipapa',
            'Una buena combinación de papas y salchichas'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111796490780803102/emplatado-final-de-las-salchipapas.png']
    ],
    [
        'Pollo Cantonés',
        [
            'Típico pollo agridulce chino bañado en una salsa de soja y azúcar',
            'Una grán comida agridulce',
            'Un buen platillo chino de pollo agridulce',
            'Una preparación clásica de pollo cocinado en una salsa agridulce'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111802560630755348/pollo-cantones.png']
    ],
    [
        'Penne',
        [
            'Una pasta tubular preparada con distintas salsas',
            'La famosa pasta italiana que puede combinarse con salsas como la carbonara y la alfredo',
            'Una deliciosa pasta italiana'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111803004065169438/84784534.png']
    ],
    [
        'Mochis',
        [
            'Una delicia japonesa caracterizada por su exterior pegajoso y el relleno sorpresa',
            'Deliciosos postres japoneses hechos a base de masa de arroz glutinoso y rellenos de una variedad de sabores',
            '¿Que sabor de relleno tendrá adentro?',
            'Su combinación única de texturas y sabores los hacen todos una delicia'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111803394210943097/recetas-de-mochis-de-mango-como-preparar-el-postre-japones-mas-popular-de-manera-sencilla.png']
    ],
    [
        'Pollo Curry',
        [
            'Pollo servido en una salsa curry',
            'La salsa curry puede tener una grán variedad de sabores y colores',
            'Curry',
            'Pollo aderezado con salsa curry acompañado con distintos ingredientes'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111804707195846656/south-indian-style-chicken-curry-1957789-hero-01-4886b469548e40278351a0085a4d9c92.png']
    ],
    [
        'Pakora',
        [
            'Un delicioso bocado frito de la cocina india hecho de diferentes verduras',
            'Una variedad frita de verduras y carnes sumergida en una masa',
            'Elaborada con una mezcla de especias y harina de garbanzo, a la cual se añaden vegetales y hasta carne',
            'Una delicia de la comida de India'
        ],
        ['https://cdn.discordapp.com/attachments/957608141275672618/1111805811107315732/image1.png']
    ],
    [
        'Kholodets',
        [
            'Carne de cerdo en caldo, junto con huesos y verduras que forman un gel natural.\nSe consume frío como aperitivo o entrante',
            'Una especie de gelatina de carne que en su interior contiene diferentes ingredientes sencillos además de la carne',
            'Un platillo tradicional ruso el cual es una especie de gelatina de carne',
            'Una grán comida de Rusia'
        ],
        [
            'https://cdn.discordapp.com/attachments/957608141275672618/1111806274787614791/kholodets.png'
        ]
    ],
    [
        'Esturión',
        [
            'Un plato del pez esturión preparado',
            'De este pez también se obtiene el caviar',
            'Preparación del pez esturión'
        ],
        [
            'https://cdn.discordapp.com/attachments/957608141275672618/1111806414227251330/osetrina.png'
        ]
    ],
    [
        'Tlayuda',
        [
            'También conocida como la pizza oaxaqueña',
            'Una grán tortilla de base a la cual se le agregan, frijoles, carne asada, queso, aguacate, salsa picante, entre otros',
            'Una tortilla grande con diferentes ingredientes añadidos',
            'Una deliciosa tortilla enorme con diferentes carnes, queso y verduras'
        ],
        [
            'https://cdn.discordapp.com/attachments/957608141275672618/1111806986166739044/1595548705_180095_1595548849_noticia_normal.png'
        ]
    ],
    [
        'Ceviche',
        [
            'Exquisita preparación peruana de mariscos frescos, como camarones, pescado o pulpo, marinados en jugo de limón o lima',
            'Deliciosa ensalada de mariscos que combina la frescura del pescado crudo con la acidez del limón',
            'Una de las mejores preparaciones de mariscos frescos'
        ],
        [
            'https://cdn.discordapp.com/attachments/957608141275672618/1111807374144061460/93256.png'
        ]
    ],
    [
        'Agua Sólida',
        [
            'Una preparación de agua en estado sólido',
            'Un bloque de agua sólida que puede venir en diferentes sabores ó natural',
            'Un refrescante bloque de agua en estado sólido, ¿Lo habías visto antes?',
            'Hielo'
        ],
        [
            'https://cdn.discordapp.com/attachments/957608141275672618/1111814944808259605/5e997cb297e3e.png'
        ]
    ],
    [
        'Fr̴͑͝o̵͋͋m̴̓͝a̵͛͝ĝ̸͊́o̸͐̚ k̵͐͝a̴̔̽j̴̀͠ ö̴́̿r̸̓̿a̸͋͝ǹ̸͝ĝ̸̓͋o̵͊͝',
        [
            'Fr̴͑͝o̵͋͋m̴̓͝a̵͛͝ĝ̸͊́o̸͐̚ k̵͐͝a̴̔̽j̴̀͠ ö̴́̿r̸̓̿a̸͋͝ǹ̸͝ĝ̸̓͋o̵͊͝',
            'T3JhbsSdYSBwcmVwYXJhZG8gc3VwZXIgZnJvbWHEnW8=',
            '1000110 1110010 1100110100 1101010001 1101011101 1101111 1100110101 1101001011 1101001011 1101101 1100110100 1101000011 1101011101 1100001 1100110101 1101011011 1101011101 100011101 1100111000 1101001010 1101000001 1101111 1100111000 1101010000 1100011010 100000 1101011 1100110101 1101011101 1101010000 1100001 1100110100 1100010100 1100111101 1101010 1100110100 1101000000 1101100000 100000 1101111 1100110100 1101000100 1100111111 1110010 1100111000 1100010011 1100111111 1100001 1100111000 1101011101 1101001011 1101110 1100111000 1101000000 1101011101 100011101 1100111000 1101000011 1101001011 1101111 1100110101 1101001010 1101011101',
            'RnLMtM2RzZ1vzLXNi82Lbcy0zYPNnWHMtc2bzZ3Ency4zYrNgW/MuM2QzJoga8y1zZ3NkGHMtMyUzL1qzLTNgM2gIG/MtM2EzL9yzLjMk8y/Ycy4zZ3Ni27MuM2AzZ3Ency4zYPNi2/Mtc2KzZ0=',
            '1001111 1110010 1100001 1101110 100011101 1100001 100000 1110000 1110010 1100101 1110000 1100001 1110010 1100001 1100100 1101111 100000 1110011 1110101 1110000 1100101 1110010 100000 1100110 1110010 1101111 1101101 1100001 100011101 1101111'
        ],
        [
            'https://cdn.discordapp.com/attachments/957608141275672618/1112469195062509720/20230528_125204.png'
        ]
    ],
    [
        'Carne de Derney',
        [
            'Una colorida carne de origen misterioso',
            'Un colorido platillo de carnes de colores inusuales',
            'Un delicioso platillo de carne una especie de otro planeta',
            'Se dice que esta carne no es de este planeta',
            'Om itnabor retolo dauver ele derney',
        ],
        [
            'https://cdn.discordapp.com/attachments/1119097611643789343/1119230233015492719/CarneDerney.jpg',
            'https://cdn.discordapp.com/attachments/1119097611643789343/1119233242059526215/DerneyCarne.jpg'
        ]
    ],
    [
        'Birria',
        [
            'Un platillo de carne de carnero (oveja macho) en un caldo condimentado',
            'Platillo de carne, comúnmente de obeja, que tambien puede ser de res o de cerdo',
            'Un caldo condimentado de carne de carnero (oveja macho)',
            'Delicioso caldo de carnes que pueden ser de diferentes animales de granja, principalmente ovejas o chivos'
        ],
        ['https://cdn.discordapp.com/attachments/1119097611643789343/1119097646364237904/images_9.jpg']
    ],
    [
        'Papas Fritas',
        [
            'Como su nombre indica, papas fritas',
            'Papas cortadas a mano en una forma rectangular irregular y fritas',
            '<:papaXD:1112128400518287392>',
            'Unas crujientes y sabrosas papas fritas con un equilibrio de sal que resalta su sabor'
        ],
        ['https://cdn.discordapp.com/attachments/1119097611643789343/1119098899429347449/images_10.jpg']
    ],
    [
        'Pho',
        [
            'Una sopa vietnamita de fideos de arroz servidos en caldo',
            'Una delicia de Vietnam',
            'Caldo de fideos de arroz que combina bien sabores dulces, salados, ácidos y picantes'
        ],
        ['https://cdn.discordapp.com/attachments/1119097611643789343/1119099346902847578/Comida-Vietnamita-Pho.webp']
    ],
    [
        'Tom Kha Gai',
        [
            'Una grán sopa de pollo en leche de coco con un toque picante y ácido',
            'Una sopa de la cocina tailandesa hecha de pollo y leche de coco adicionada con varios ingredientes picantes y ácidos',     
            'Una delicia de Tailandia'
        ],
        ['https://cdn.discordapp.com/attachments/1119097611643789343/1119100096253009990/Tom-Khai-Kai940x640-768x523.jpg']
    ],
    [
        'Patacón',
        [
            'Platanos fritos',
            'Rodajas de platano verde aplastadas y fritas',     
            'Rodajas de platano verde frito con una textura crujiente por fuera y suave por dentro'
        ],
        ['https://cdn.discordapp.com/attachments/1119097611643789343/1119100769325555832/images_11.jpg']
    ],
    [
        'Chop Suey',
        [
            'Una combinacion de diferentes carnes y verduras en una salsa agridulce',
            'Es una mezcla de carne, pollo o camarones, y una variedad de verduras frescas, como pimientos, cebollas y brotes de bambú, servidas en una salsa agridulce'
        ],
        ['https://cdn.discordapp.com/attachments/1119097611643789343/1119102100526354442/images_12.jpg']
    ]
];

NEGATIVOS = [
    '{0} no quizo comer',
    'A {0} no le gustó y no comió',
    '{0} no pudo comer completamente',
    'A {0} se olvidó y no comió',
    'A {0} le supo horrible',
    '{0} perdió el apetito',
    'Le dieron demasiado a {0} y no terminó',
    'A {0} le salió un pelo en la comida y lo devolvió',
    'A {0} le salió una mosca en la comida y lo devolvió',
    'A {0} le salió un pelo en la comida, aún así se comió {1}',
    'A {0} le salió una mosca en la comida, aún así se comió {1}',
    'A {0} no le gustó y le dió 1 estrella al restaurante',
    'La comida le provocó alergia a {0}',
    '{0} no pudo comer porque {2} está mirando fijamente',
    'La comida le provocó diarrea a {0}',
    '{0} fué al baño y al regresar su comida no estaba',
    'A {0} se le cayó la comida',
    'A {0} se le cayó la comida, aún así se la comió',
    '{0} sospechó de la comida y no comió',
    '{0} leyó la descripción con voz seductora y se comió {1}',
    '{0} comió demasiado y le dió indigestión',
    '{0} le dió su comida a {2}',
    '{2} le dió sospechosamente la comida a {0} y se comió {1}',
    '{0} sospechó de la comida y se la dió a {2}',
    '{0} guardó la comida, pero se le olvidó y se le caducó',
    'La comida le pareció demasiado fria a {0}',
    'A {0} se le cayó la comida encima',
    '<:trauma:802652674390360125>',
    'A {0} se le olivdó pagar la comida y se comió {1}',
    '{2} le estornudó a la comida de {0}',
    'Alguien estornudó en la comida de {0}',
    '{0} tiene prohibido comer esto',
    'La comida de {0} estaba contaminada con radiación',
    'Por comer en la calle, atropellaron a {0}',
    'Un perro le arrebató la comida a {0}',
    'A {0} se le atoró la comida',
    'La comida le provocó extreñimiento a {0}',
    'La comida de {0} cobró vida y se escapó',
    'Le dieron la comida quemada a {0}',
    '{2} le robó la comida a {0}',
    '{0} prefirió darle la comida a {2} y se comió {1}',
    'A {0} se le cayó la comida y se la dió a {2}',
    'A {0} le dieron comida caducada',
    '{0} mejor le dió la comida al perro',
    '{0} mejor le dió la comida al gato',
    'A {0} le gustó tanto la comida que se desmayó',
    '{0} cayó en un coma alimenticio',
    '{2} se robó la comida de {0}',
    'La comida de {0} estaba infectada de una bacteria peligrosa'
];

/**
 * @param {Message} msg
 */
function exec(msg, args, cliente, discord){
    let PROBS = [
        0,
        0,
        getRandomInt(0, 20),
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        3,
        4,
        5,
        getRandomInt(0, 3),
        getRandomInt(0, 5),
        getRandomInt(0, 10),
        getRandomInt(0, 200)
    ];
    comida = COMIDAS[getRandomInt(0, COMIDAS.length)]
    var embed = new MessageEmbed();
    var nComidas = elemAleatorio(PROBS);
    var txtMsg = msg.member.displayName + " se comió " + nComidas;
    if(nComidas < 1){
        txtMsg = format(elemAleatorio(NEGATIVOS), [msg.member.displayName, elemAleatorio(PROBS), miembroAleatorio(cliente, msg.guildId, msg.author.username).displayName]);
    }
    embed.setColor('#7d7d7d');
    embed.setTitle(comida[0]);
    embed.setDescription(elemAleatorio(comida[1]));
    embed.setImage(elemAleatorio(comida[2]));
    embed.setFooter({text: txtMsg});

    msg.channel.send({embeds: [embed]});
    return true;
}

format = function (str, args) {
    return str.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] == 'undefined' ? match : args[index];
    });
  };