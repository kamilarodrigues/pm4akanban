import shortid from "shortid";

//Dê a cada cartão em uma lista um _id e a cor branca, A MENOS QUE essas propriedades já existam
const appendAttributes = list =>
    list.map(card => ({
        color: "white",
        _id: shortid.generate(),
        ...card
    }));

//criando board quando entrar pela primeira vez
const createWelcomeBoard = userId => {
    const list1 = [
        {
            text: `### Teste Kamila 
        kamila teste`, color: "#fff"
        },
        {
            text: `### Teste Kamila 2
            olá teste 2`,
            color: "#6df"
        }
    ];

    const list2 = [
        {text: "teste"},
        {
            text: `### Works on mobile devices
Unlike a certain other website...`
        },
        {
            text: `### And more!
 Colors`,
            color: "#ff6",
            date: new Date()
        }
    ];

    const list3 = [
        {text: "teste"}
    ];

    const list4 = [];

    return {
        _id: shortid.generate(),
        title: "Tutorial board",
        color: "blue",
        lists: [
            {
                _id: shortid.generate(),
                title: "Objetivos de negócio",
                cards: appendAttributes(list1)
            },
            {
                _id: shortid.generate(),
                title: "Investigação/Pergunta(s)",
                cards: appendAttributes(list2)
            },
            {
                _id: shortid.generate(),
                title: "Descoberta(s)",
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                title: "Solução/Soluções",
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                title: "Fontes de dados",
                cards: appendAttributes(list4)
            },
            {
                _id: shortid.generate(),
                title: "Internas",
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                title: "Externas",
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                title: "Matriz influência das pessoas e riscos",
                cards: appendAttributes(list4)
            },
            {
                _id: shortid.generate(),
                title: "Payback period",
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                title: "Poder de influência",
                cards: appendAttributes(list3)
            },
            {
                _id: shortid.generate(),
                title: "Impacto",
                cards: appendAttributes(list3)
            }
        ],
        users: userId ? [userId] : []
    };
};

export default createWelcomeBoard;
