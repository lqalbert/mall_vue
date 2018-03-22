import SearchTool from '../../../mix/SearchTool';
import DataTable from '../../../mix/DataTable';
import SubDetail from '../SubDetail';


const mix = {
    mixins: [SearchTool,DataTable,],
    components: {
        SubDetail
    },
    data(){
        return {
            
        }
    }
};

export default mix;