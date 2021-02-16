import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Cars({car}) {
    const router = useRouter()
    const { id } = router.query;

    return (
        <>
            <Head><title>{car.color}</title></Head>
            <h1>cars {id} </h1>
            <img src={car.image}/>
        </>
    )
} 

// tells next to prerender function
export async function getStaticProps({params}) {
    console.log(params)
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: {
            car: data
        }
    }
}

// tells next which dynamic pages to render
export async function getStaticPaths() {
    const req = await fetch(`http://localhost:3000/cars.json`);
    const data = await req.json();

    console.log(data)

    const paths = data.map(car => {
        return {params: {id: car}}
    })

    return {
        paths,
        fallback: false
    }
}