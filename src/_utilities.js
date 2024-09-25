const fetchCountries = async () => {
  try {
    const res = await fetch('/data.json')
    return await res.json();
  } catch (err) {
    console.log(`Opps, seems an error occured: ${err}`)
  }
}

export default fetchCountries