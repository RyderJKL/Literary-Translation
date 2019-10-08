import { StoreModelType } from 'store';
import { useStoreData } from './use-store-data';
import { storeContext } from './use-store-context';

const userStore = <Selection>(dataSelector: (store: StoreModelType) => Selection) =>
    // tslint:disable-next-line:react-hooks-nesting
    useStoreData(storeContext, (contextData) => contextData!, dataSelector);

export default userStore;
