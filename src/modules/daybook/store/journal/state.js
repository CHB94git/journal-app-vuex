

export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quaerat, praesentium ad similique laboriosa',
            picture: null
        },
        {
            id: new Date().getTime() + 100,
            date: new Date().toDateString(),
            text: 'Id est culpa velit dolor aliquip irure consectetur nulla minim qui cillum sit.',
            picture: null
        },
        {
            id: new Date().getTime() + 200,
            date: new Date().toDateString(),
            text: 'Amet sit adipisicing pariatur elit magna dolor labore magna cupidatat laborum. Sint est eiusmod ipsum laborum laborum. Consequat mollit velit est commodo in ea occaecat est anim aliquip minim ea. Ut qui sit cupidatat ex amet qui fugiat. Nostrud ea fugiat ad amet cillum consectetur laboris voluptate aliqua ea ex magna.',
            picture: null
        }
    ]
})