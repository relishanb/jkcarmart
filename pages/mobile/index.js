import { MobileUserpanel } from '@/components/UserPanel/Mobile/MobileUserpanel';
import UserPanel from '@/components/UserPanel/UserPanel';
import useScreenType from '@/hooks/useScreenType';
import React from 'react'

const Account = () => {
    const isMobile = useScreenType();
    return (
        <>
            {
                isMobile ? <MobileUserpanel/> : <UserPanel/>
            }
        </>
  )
}

export default Account;