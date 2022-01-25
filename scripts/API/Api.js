const getMedia = async () => {
    return await fetch("data/photographers.json")
    .then((res) => res.json());
  };

const init = async () => {
    const { photographers } = await getMedia(); 
    console.log(photographers)
}

init();

