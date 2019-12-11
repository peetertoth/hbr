import Vue from 'vue';
import Vuex from 'vuex';

import CommonModule from './store_modules/common_module';
import UserModule from './store_modules/user_module';
import GroupListModule from './store_modules/group_list_module';
import GroupDetailsModule from './store_modules/group_details_module';
import StudentListModule from './store_modules/student_list_module';
import StudentDetailsModule from './store_modules/student_details_module';
import StudentImportModule from './store_modules/student_import_module';
import VisitListModule from './store_modules/visit_list_module';
import VisitDetailsModule from './store_modules/visit_details_module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common: CommonModule,
    user: UserModule,
    group: GroupListModule,
    groupDetails: GroupDetailsModule,
    student: StudentListModule,
    studentDetails: StudentDetailsModule,
    studentImport: StudentImportModule,
    visit: VisitListModule,
    visitDetails: VisitDetailsModule,
  },
});
