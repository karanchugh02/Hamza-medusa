import React, { Suspense, useState, useEffect } from 'react'
import { useAdminCollection } from 'medusa-react'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import Thumbnail from '@modules/products/components/thumbnail'
import { Text } from '@medusajs/ui'
import PreviewPrice from '@modules/products/components/product-preview/price'
import { ProductPreviewType } from 'types/global'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import ProductPreview from '@modules/products/components/product-preview'
import { getRegion } from '@/app/actions'

// TODO: Refactor goals to use <Suspense .. /> to wrap collection && <SkeletonProductGrid /> for loading state

type Props = {
    collectionId: string
}

const ProductCollections = ({ collectionId }: Props) => {
    const { collection, isLoading } = useAdminCollection(collectionId)
    const [region, setRegion] = useState(null)

    // Asynchronously fetch the region data when the component mounts
    useEffect(() => {
        const fetchRegion = async () => {
            const regionData = await getRegion('us') // Assuming getRegion is an async function
            setRegion(regionData)
        }

        fetchRegion()
    }, []) // The empty dependency array ensures this runs only once on mount

    // If you're waiting for both the collection and region to load, you can adjust your loading logic accordingly
    if (isLoading || !region) {
        return <SkeletonProductGrid /> // Assuming this is your loading state component
    }

    return (
        <div className="text-white">
            {/* No need for Suspense here since you're handling the loading state manually */}
            {collection && (
                <div>
                    <div className="mb-8 text-2xl-semi">
                        <h1>{collection.title}</h1>
                    </div>
                    {collection.products.map((product) => (
                        <li key={product.id}>
                            <ProductPreview
                                productPreview={product}
                                region={region}
                            />
                        </li>
                        // The rest of your mapping...
                    ))}
                </div>
            )}
        </div>
    )
}
export default ProductCollections
