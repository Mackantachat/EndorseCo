<template>
  <section class="bg-white ">
    <div class="container py-20 mx-auto">
      <div class="flex flex-wrap items-center">
        <div class="w-full p-4 lg:w-12/12">
          <div class="mb-1 flex-row grid grid-cols-2 gap-2">
            <div class="flex justify-start col-start-1 gap-1">
              <label class="mr-1 text-left" for="ddlChannelType">ช่องทางการขาย : </label>
              <div>
                <Select2 v-model="SearchObject.ddlChannelType" :options="channelTypeOptions" key="Id"
                  :settings="{ allowClear: true, placeholder: 'เลือกช่องทางการขาย'}" @select="GetPolicyHolding"
                  id="ddlChannelType">
                </Select2>
                <div v-if="v$.SearchObject.ddlChannelType.$error" class="mt-1 ml-1 text-sm text-red-500">
                  {{ v$.SearchObject.ddlChannelType.$errors[0].$message }}
                </div>
              </div>
            </div>
          </div>

          <div class="mb-1 flex-row grid grid-cols-1">
            <div class="flex justify-start col-start-1 gap-1">
              <label class="mr-1 text-left" for="PolicyNo">เลขกรมธรรม์/Cer No. : </label>
              <input v-model="SearchObject.PolicyNo"
                class="shadow appearance-none border rounded w-60 h-7 py-2 px-3 text-gray-700 leading-tight"
                @keypress.enter="SearchingPolicy()" type="text">

              <div v-if="policyHoldingOptions != ''">
                <Select2 v-model="ddlPolicyHolding" :options="policyHoldingOptions" key="Id"
                  :settings="{ allowClear: true, placeholder: 'เลือก'}" id="ddlPolicyHolding">
                </Select2>
              </div>
            </div>
            <div v-if="v$.SearchObject.PolicyNo.$error" class="mt-1 ml-1 text-sm text-red-500">
              {{ v$.SearchObject.PolicyNo.$errors[0].$message }}
            </div>
          </div>

          <div class="mb-2 mt-2">
            <input @click="SearchingPolicy()" type="button"
              class="h-10 w-30 pl-2 pr-2 text-white rounded-lg bg-blue-500 hover:bg-blue-600 mr-4" value="ค้นหาข้อมูล">
            <input @click="SaveData()" type="button"
              class="h-10 w-30 pl-2 pr-2 text-white rounded-lg bg-green-500 hover:bg-green-600 mr-4"
              value="บันทึกข้อมูล">
            <input @click="ClearData()" type="button"
              class="h-10 w-30 pl-2 pr-2 text-white rounded-lg bg-red-500 hover:bg-red-600 mr-4" value="ล้างข้อมูล">

          </div>

          <div class="mb-1 flex-row grid grid-cols-1">
            <div class="flex justify-start col-start-1 gap-1">
              <label class="mr-1 text-left" for="CusName">ชื่อ-นามสกุล : </label>
              <input v-model="CusName" disabled
                class="shadow appearance-none border rounded w-80 h-7 py-2 px-3 text-gray-700 leading-tight"
                id="CusName" type="text">
            </div>
          </div>

          <div class="mb-1 flex-row grid grid-cols-2">
            <div class="flex justify-start col-start-1 gap-1">
              <label class="mr-1 text-left" for="CartNo">เลขบัตรประชาชน : </label>
              <input v-model="CartNo" disabled
                class="shadow appearance-none border rounded w-80 h-7 py-2 px-3 text-gray-700 leading-tight" id="CartNo"
                type="text">

              <label class="mr-1 text-left" for="birthDate">วันเกิด : </label>
              <input v-model="birthDate" disabled
                class="shadow appearance-none border rounded w-60 h-7 py-2 px-3 text-gray-700 leading-tight">


            </div>
            <div class="flex justify-end col-start-2 gap-1">
              <label class="mr-1 text-right" for="ExcludeTranDate">วันที่บันทึกเสนอเงื่อนไข : </label>
              <div class="flex">
                <input as-single placeholder="เลือกวันที่" v-model="ExcludeTranDate" disabled
                  class="shadow appearance-none border rounded w-60 h-7 py-2 px-3 text-gray-700 leading-tight">
              </div>
            </div>
          </div>

          <div class="w-full pt-5 pb-1 bg-blue-300">
            <h3 class="text-left mb-8 pl-1">บันทึกเสนอเงื่อนไข</h3>
            <div class="mb-1 pl-1 pr-1 flex-row grid grid-cols-5">
              <div class="col-start-1 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="EffDate">วันที่มีผล</label>
                </div>
                <div class="flex justify-center">
                  <div class="flex">
                    <litepie-datepicker as-single placeholder="เลือกวันที่มีผล" v-model="SaveCondition.EffDate"
                      v-model:value="SaveCondition.EffDate" :disabled="editDisable" :formatter="formatter"
                      class="h-7 disabled:opacity-50 disabled:cursor-not-allowed">
                    </litepie-datepicker>
                  </div>
                </div>
                <div v-if="v$.SaveCondition.EffDate.$error" class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCondition.EffDate.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-2 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="RefDate">วันที่ออกหนังสือCO</label>
                </div>
                <div class="flex justify-center">
                  <div class="flex">
                    <litepie-datepicker as-single placeholder="เลือกวันที่ออกหนังสือCO" v-model="SaveCondition.RefDate"
                      v-model:value="SaveCondition.RefDate" :disabled="editDisable" :formatter="formatter"
                      class="h-7 disabled:opacity-50 disabled:cursor-not-allowed">
                    </litepie-datepicker>
                  </div>
                </div>
                <div v-if="v$.SaveCondition.RefDate.$error" class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCondition.RefDate.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-3 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="EndorseDate">วันที่สลักหลัง</label>
                </div>
                <div class="flex justify-center">
                  <div class="flex">
                    <litepie-datepicker as-single placeholder="เลือกวันที่สลักหลัง" v-model="SaveCondition.EndorseDate"
                      v-model:value="SaveCondition.EndorseDate" :disabled="editDisable" :formatter="formatter"
                      class="h-7 disabled:opacity-50 disabled:cursor-not-allowed">
                    </litepie-datepicker>
                  </div>
                </div>
                <div v-if="v$.SaveCondition.EndorseDate.$error" class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCondition.EndorseDate.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-4 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="SaveCondition.Referance">เลขที่สลักหลัง</label>
                </div>
                <div class="flex justify-center">
                  <input v-model="SaveCondition.Referance" :disabled="editDisable"
                    class="shadow appearance-none border rounded w-80 h-7 py-2 px-3 text-gray-700 leading-tight"
                    id="SaveCondition.Referance" type="text">
                </div>
                <div v-if="v$.SaveCondition.Referance.$error" class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCondition.Referance.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-5 gap-1">
                <div class="flex pl-1 pt-3">
                  <button type="button" @click="GenRef()"
                    class="h-10 w-20 mr-3 text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="this.$store.state.isDisable">Gen Ref</button>
                  <label class="flex items-center dark:text-gray-400">
                    <input type="checkbox" v-model="ExcludeTmn" :disabled="this.$store.state.isDisable"
                      class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                    <span class="ml-2">ยกเลิก</span>
                  </label>
                  <button v-if="UpdateProcess == 'INSERT'" @click="AddExclusion()"
                    class="h-10 w-20 ml-3 text-white rounded-lg bg-green-400 hover:bg-green-500">เพิ่มข้อมูล</button>
                  <button @click="EditExclusionID(excludeId)" v-else-if="UpdateProcess == 'EDIT'"
                    class="h-10 w-20 ml-3 text-white rounded-lg bg-yellow-400 hover:bg-yellow-500">แก้ไข</button>
                </div>
              </div>
            </div>

            <div class="mb-1 pl-5 pr-5 flex-row grid grid-cols-5" v-if="ExcludeTmn == true">
              <div class="col-start-1 gap-1">
                <div class="flex justify-end  pt-7">
                  <label class="mr-1 text-center" for="">ยกเลิก</label>
                </div>
              </div>
              <div class="col-start-2 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="CancelEndorseDate">วันที่สลักหลัง</label>
                </div>
                <div class="flex justify-center">
                  <div class="flex">
                    <litepie-datepicker as-single placeholder="เลือกวันที่สลักหลัง"
                      v-model="SaveCancelCondition.CancelEndorseDate"
                      v-model:value="SaveCancelCondition.CancelEndorseDate" :formatter="formatter" class="h-7 ">
                    </litepie-datepicker>
                  </div>
                </div>
                <div v-if="v$.SaveCancelCondition.CancelEndorseDate.$error"
                  class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCancelCondition.CancelEndorseDate.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-3 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="SaveCancelCondition.CancelReference">เลขที่สลักหลัง</label>
                </div>
                <div class="flex justify-center">
                  <input v-model="SaveCancelCondition.CancelReference"
                    class="shadow appearance-none border rounded w-80 h-7 py-2 px-3 text-gray-700 leading-tight"
                    id="SaveCancelCondition.CancelReference" type="text">
                </div>
                <div v-if="v$.SaveCancelCondition.CancelReference.$error"
                  class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCancelCondition.CancelReference.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-4 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-center" for="tmneffdt">วันที่มีผลการยกเลิก</label>
                </div>
                <div class="flex justify-center">
                  <div class="flex">
                    <litepie-datepicker as-single placeholder="เลือกวันที่สลักหลัง"
                      v-model="SaveCancelCondition.tmneffdt" v-model:value="SaveCancelCondition.tmneffdt"
                      :formatter="formatter" class="h-7 ">
                    </litepie-datepicker>
                  </div>
                </div>
                <div v-if="v$.SaveCancelCondition.tmneffdt.$error" class="mt-1 ml-1 text-sm text-red-500 text-center">
                  {{ v$.SaveCancelCondition.tmneffdt.$errors[0].$message }}
                </div>
              </div>
              <div class="col-start-5 gap-1">
                <div class="flex justify-center">
                  <label class="mr-1 text-left" for="ddlExcludeTmnCause">สาเหตุการยกเลิก</label>
                </div>
                <div class="flex justify-center">
                  <div>
                    <Select2 v-model="SaveCancelCondition.ddlExcludeTmnCause" :options="excludeTmnCauseOptions" key="Id"
                      class="ddl-Exclude-tmn-cause" :settings="{ allowClear: true, placeholder: 'เลือกสาเหตุการยกเลิก'}"
                      id="ddlExcludeTmnCause">
                    </Select2>
                    <div v-if="v$.SaveCancelCondition.ddlExcludeTmnCause.$error"
                      class="mt-1 ml-1 text-sm text-red-500 text-center">
                      {{ v$.SaveCancelCondition.ddlExcludeTmnCause.$errors[0].$message }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ตารางแสดงรายการ -->
          <div class="w-full overflow-hidden rounded-lg shadow-xs pt-10">
            <!-- v-if="dataTables.length > 0" -->
            <div class="w-full overflow-hidden">
              <h3 class="text-left pt-5 mb-2 text-blue-400">รายการเสนอเงื่อนไข</h3>
              <table class="w-full whitespace-no-wrap">
                <thead>
                  <tr
                    class="text-xs font-semibold tracking-wide text-left text-gray-900 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th class="px-4 py-3 text-center bg-blue-300">ลำดับ</th>
                    <th class="px-4 py-3 text-center bg-green-200">วันที่บันทึกเสนอเงื่อนไข</th>
                    <th class="px-4 py-3 text-center bg-green-300">วันที่มีผล</th>
                    <th class="px-4 py-3 text-center bg-red-300">วันที่มีผลการยกเลิก</th>
                    <th class="px-4 py-3 text-center bg-blue-300">วันที่ออกหนังสือCO</th>
                    <th class="px-4 py-3 text-center bg-blue-300">เลขที่สลักหลัง</th>
                    <th class="px-4 py-3 text-center bg-blue-300">วันที่สลักหลัง</th>
                    <th class="px-4 py-3 text-center bg-blue-300">ผู้ออกเงื่อนไข</th>
                    <th class="px-4 py-3 text-center bg-red-300">ยกเลิก</th>
                    <th class="px-4 py-3 text-center bg-red-300">วันที่สลักหลัง(ยกเลิก)</th>
                    <th class="px-4 py-3 text-center bg-red-300">เลขที่สลักหลัง(ยกเลิก)</th>
                    <th class="px-4 py-3 text-center bg-red-300">สาเหตุยกเลิก</th>
                    <th class="px-4 py-3 text-center bg-yellow-300"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  <!-- @click="ThisMonthDetail(dataTable.POLICY_MONTH,listOfCondition.POLICY_YEAR)" -->
                  <tr v-for="(listOfCondition , index) in listOfConditionDT" :key="index"
                    :class="index == lengthReport ? 'text-gray-700 dark:text-gray-400 hover:bg-blue-100' : null">
                    <td class="px-4 py-3 text-sm bg-blue-200 hover:underline"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null"> {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-green-100"
                      :class="index == lengthReport ? 'text-center bg-green-200' : null">
                      {{listOfCondition.EXCLUDE_TRN_DT }}</td>
                    <td class="px-4 py-3 text-sm bg-green-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-green-300' : null">
                      {{listOfCondition.EFF_DT }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">
                      {{listOfCondition.clmtmneffdt }}</td>
                    <td class="px-4 py-3 text-sm bg-blue-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null">{{listOfCondition.REF_DT }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-blue-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null">{{listOfCondition.Reference }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-blue-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null">{{listOfCondition.ENDORSE_DT }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-blue-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null">
                      {{listOfCondition.Underwrite_Name }}</td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">{{listOfCondition.TMN_DESCRIPT }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">
                      {{listOfCondition.CANCEL_ENDORSE_DT }}</td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">
                      {{listOfCondition.CANCEL_REFERENCE }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">
                      {{listOfCondition.EXC_TMN_CAUSE}}
                    </td>
                    <td class="px-4 py-3 text-sm bg-yellow-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-yellow' : null">
                      <input @click="editListOfCondition(listOfCondition.EXCLUDE_ID ,listOfCondition.TMN )"
                        type="button"
                        class="h-10 w-30 pl-2 pr-2 text-white rounded-lg bg-yellow-500 hover:bg-yellow-600 mr-4"
                        value="แก้ไข">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h3 v-if="lengthReport == 0" class="text-center text-red-400">{{ this.$store.state.notFoundData }}</h3>
          <div class="w-full mt-4 pt-5 pb-1 bg-green-200">
            <h3 class="text-left mb-8 pl-1">เก็บข้อมูลรายการเสนอเงื่อนไข</h3>
            <div class="mb-1 pl-2 pr-1 flex-row grid grid-cols-2">
              <div class="flex justify-end col-start-1 gap-1">
                <label class="mr-1  text-left" for="ddlExcludeScript">ข้อความเสนอเงื่อนไข</label>
                <div>
                  <Select2 v-model="SaveConditionDetail.ddlExcludeScript" :options="ExcludeScriptOptions" key="Id"
                    :aria-disabled="isDisableListConDet" class="ddl-Exclude-Script"
                    :settings="{ allowClear: true, placeholder: 'เลือกข้อความเสนอเงื่อนไข'}" id="ddlExcludeScript">
                  </Select2>
                  <div v-if="v$.SaveConditionDetail.ddlExcludeScript.$error"
                    class="mt-1 ml-1 text-sm text-red-500 text-left">
                    {{ v$.SaveConditionDetail.ddlExcludeScript.$errors[0].$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-1 pl-2 pr-1 flex-row grid grid-cols-2">
              <div class="flex justify-end col-start-1 gap-1">
                <textarea v-model="SaveConditionDetail.txtExclude" class="ml-36" name="" id="" cols="75" rows="5"
                  maxlength="95" placeholder="กรุณากรอกข้อความไม่เกิน 95 ตัวอักษร"
                  :disabled="isDisableListConDet"></textarea>
              </div>
              <div class="flex justify-start col-start-2 gap-1">
                <div class="mb-1 ml-1 flex-row grid grid-cols-4">
                  <div class="col-start-1 gap-1">
                    <div class="flex justify-center">
                      <label class="mr-1 text-center" for="AdmitDt">วันที่ตอบรับ</label>
                    </div>
                    <div class="flex justify-center">
                      <div class="flex">
                        <litepie-datepicker as-single placeholder="เลือก" v-model="SaveConditionDetail.AdmitDt"
                          v-model:value="SaveConditionDetail.AdmitDt" :disabled="isDisableListConDet"
                          :formatter="formatter" class="h-7 disabled:opacity-50 disabled:cursor-not-allowed">
                        </litepie-datepicker>
                      </div>
                    </div>
                    <div v-if="v$.SaveConditionDetail.AdmitDt.$error"
                      class="mt-1 ml-1 text-sm text-red-500 text-center">
                      {{ v$.SaveConditionDetail.AdmitDt.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="col-start-2 gap-1">
                    <div class="flex justify-center">
                      <label class="mr-1 text-left" for="ddlExcludeCause">สาเหตุ</label>
                    </div>
                    <div class="flex justify-center">
                      <div>
                        <Select2 v-model="SaveConditionDetail.ddlExcludeCause" :options="ExcludeCauseOptions" key="Id"
                          class="ddl-cancel" aria-disabled="isDisableListConDet" :disabled="isDisableListConDet"
                          :settings="{ allowClear: true, placeholder: 'เลือก'}" id="ddlExcludeCause">
                        </Select2>
                      </div>
                    </div>
                    <div v-if="v$.SaveConditionDetail.ddlExcludeCause.$error"
                      class="mt-1 ml-1 text-sm text-red-500 text-center">
                      {{ v$.SaveConditionDetail.ddlExcludeCause.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="col-start-3 gap-1">
                    <div class="flex justify-center">
                      <label class="mr-1 text-center" for="EndorsePrint">พิมพ์สลักหลัง</label>
                    </div>
                    <div class="flex justify-center">
                      <div>
                        <Select2 v-model="SaveConditionDetail.ddlEndorsePrint" :options="endorsePrintOptions" key="Id"
                          class="ddl-cancel" :aria-disabled="isDisableListConDet" :disabled="isDisableListConDet"
                          :settings="{ allowClear: true, placeholder: 'เลือก'}" id="ddlEndorsePrint">
                        </Select2>
                      </div>
                    </div>
                    <div v-if="v$.SaveConditionDetail.ddlEndorsePrint.$error"
                      class="mt-1 ml-1 text-sm text-red-500 text-center">
                      {{ v$.SaveConditionDetail.ddlEndorsePrint.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="col-start-4 gap-1">
                    <div class="flex pl-1 pt-3">
                      <label class="flex items-center dark:text-gray-400">
                        <input type="checkbox" v-model="Ex_Det_TMN"
                          class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                        <span class="ml-2">ยกเลิก</span>
                      </label>
                      <button :disabled="isDisableListConDet" @click="AddNewListDetail()"
                        v-if="ListDetailProcess == 'INSERT'"
                        class="h-10 w-20 ml-3 text-white rounded-lg bg-green-400 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed">เพิ่มรายการ</button>
                      <button @click="EditDetailInsuredInTable(ExcludeDetId)" v-else-if="ListDetailProcess == 'EDIT'"
                        class="h-10 w-20 ml-3 text-white rounded-lg bg-yellow-400 hover:bg-yellow-500">แก้ไข</button>
                    </div>
                  </div>
                  <div class="col-start-2 gap-1" v-if="Ex_Det_TMN">
                    <div class="flex justify-center">
                      <label class="mr-1 text-center" for="ddlExcludeDettmncause">สาเหตุการยกเลิก</label>
                    </div>
                    <div class="flex justify-center">
                      <div>
                        <Select2 v-model="SaveCancelConditionDetail.ddlExcludeDettmncause"
                          :options="excludeDettmncauseOptions" key="Id" :aria-disabled="isDisableListConDet"
                          :disabled="this.$store.state.isDisable" class="ddl-cancel"
                          :settings="{ allowClear: true, placeholder: 'เลือก'}" id="ddlExcludeDettmncause">
                        </Select2>
                        <div v-if="v$.SaveCancelConditionDetail.ddlExcludeDettmncause.$error"
                          class="mt-1 ml-1 text-sm text-red-500 text-center">
                          {{ v$.SaveCancelConditionDetail.ddlExcludeDettmncause.$errors[0].$message }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="v$.SaveConditionDetail.txtExclude.$error" class="mt-1 ml-1 text-sm text-red-500 text-left pl-44">
              {{ v$.SaveConditionDetail.txtExclude.$errors[0].$message }}
            </div>
            <div class="mb-1 pl-2 pr-1 flex-row grid grid-cols-2">
              <div class="flex justify-end col-start-1 gap-1">
                <label class="mr-1 text-center italic" for="LengthExclude">จำนวนตัวอักษร</label>
                <input v-model="SaveConditionDetail.txtExclude.length" :disabled="true"
                  class="shadow appearance-none border rounded w-28 h-7 py-2 px-3 text-gray-700 leading-tight text-right"
                  id="LengthExclude" type="text">
              </div>
            </div>
          </div>
          <!-- ตารางแสดงรายการ -->
          <div class="w-full overflow-hidden rounded-lg shadow-xs pt-10">
            <!-- v-if="dataTables.length > 0" -->
            <div class="w-full overflow-hidden">
              <h3 class="text-left pt-5 mb-2 text-blue-400">รายการรายละเอียดเสนอเงื่อนไขต่อผู้เอาประกันภัย</h3>
              <table class="w-full whitespace-no-wrap">
                <thead>
                  <tr
                    class="text-xs font-semibold tracking-wide text-left text-gray-900 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th class="px-4 py-3 text-center bg-blue-300">ลำดับ</th>
                    <th class="px-4 py-3 text-center bg-green-200">ข้อความเสนอเงื่อนไข</th>
                    <th class="px-4 py-3 text-center bg-green-300">วันที่ตอบรับ</th>
                    <th class="px-4 py-3 text-center bg-yellow-300">สาเหตุ</th>
                    <th class="px-4 py-3 text-center bg-blue-300">พิมพ์สลักหลัง</th>
                    <th class="px-4 py-3 text-center bg-red-300">ยกเลิก</th>
                    <th class="px-4 py-3 text-center bg-red-300">วันที่ยกเลิก</th>
                    <th class="px-4 py-3 text-center bg-yelloinw-300">สาเหตุยกเลิก</th>
                    <th class="px-4 py-3 text-center bg-yellow-300"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  <!-- @click="ThisMonthDetail(dataTable.POLICY_MONTH,listOfCondition.POLICY_YEAR)" -->
                  <tr v-for="(detailInsured ,index ) in detailListInsured" :key="index"
                    :class="index == lengthReport ? 'text-gray-700 dark:text-gray-400 hover:bg-blue-100' : null">
                    <td class="px-4 py-3 text-sm bg-blue-200 hover:underline"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null">{{ index + 1 }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-green-100"
                      :class="index == lengthReport ? 'text-center bg-green-200' : null">
                      {{detailInsured.EXCLUDE }}</td>
                    <td class="px-4 py-3 text-sm bg-green-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-green-300' : null">
                      {{detailInsured.ADMIT_DT_TEXT }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-yellow-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-yellow-300' : null">
                      {{detailInsured.Exclude_Cause_Detail }}</td>
                    <td class="px-4 py-3 text-sm bg-blue-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-blue-300' : null">
                      {{detailInsured.ENDORSE_PRINTING_TEXT == 'Y' ? "พิมพิ์": "ไม่พิมพ์" }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">
                      {{detailInsured.TMN_TEXT == "Y" ? "ยกเลิก" :"ไม่ยกเลิก"}}
                    </td>
                    <td class="px-4 py-3 text-sm bg-red-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-300' : null">{{detailInsured.Exclude_tmn_dt }}
                    </td>
                    <td class="px-4 py-3 text-sm bg-yellow-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-yellow-300' : null">
                      {{detailInsured.Exclude_tmn_Cause_Detail }}</td>
                    <td class="px-4 py-3 text-sm bg-yellow-200 text-center"
                      :class="index == lengthReport ? 'text-center bg-red-yellow' : null">
                      <input type="button" :disabled="detailInsured.TMN_TEXT == 'Y' ? true : false"
                        @click="EditDetailInsured(detailInsured.EXCLUDE_DET_ID)"
                        class="h-10 w-30 pl-2 pr-2 text-white rounded-lg bg-yellow-500 hover:bg-yellow-600 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        value="แก้ไข">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="Loading">
      <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-90 z-50">
        <span class="text-blue-500 opacity-90 top-1/2 my-0 mx-auto block relative w-0 h-0" style="top: 50%">
          <RotateSquare2 />
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    ref
  } from 'vue';
  import http from '@/services/AuthService'
  import Select2 from 'vue3-select2-component'
  import useValidate from '@vuelidate/core'
  import {
    required,
    helpers
  } from '@vuelidate/validators'
  import LitepieDatepicker from 'litepie-datepicker';
  import Swal from 'sweetalert2/src/sweetalert2.js'
  import {
    RotateSquare2
  } from 'vue-loading-spinner'

  export default {
    components: {
      Select2,
      LitepieDatepicker,
      RotateSquare2
    },
    setup() {
      const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM',
      })

      return {
        formatter,
      };

    },
    data() {
      return {
        v$: useValidate(),
        SearchObject: {
          PolicyNo: '',
          ddlChannelType: '',
        },
        Loading: false,
        channelTypeOptions: [],
        ddlPolicyHolding: '',
        policyHoldingOptions: [],
        CusName: '',
        CartNo: '',
        birthDate: '',
        PolicyId: '',
        ExcludeTranDate: '',
        listOfConditionDT: [],
        detailListInsured: [],
        P_POL_EXCLUSION_DETAIL_AND_CAUSE: [],
        ExcludeScriptOptions: [],
        ExcludeCauseOptions: [],
        excludeDettmncauseOptions: [],
        endorsePrintOptions: [],
        LengthExclude: 0,
        lengthReport: Number,
        excludeTmnCauseOptions: [],
        ExcludeTmn: false,
        SaveCondition: {
          EffDate: '',
          RefDate: '',
          EndorseDate: '',
          Referance: '',

        },
        SaveCancelCondition: {
          CancelEndorseDate: '',
          tmneffdt: '',
          ddlExcludeTmnCause: '',
          CancelReference: '',
        },
        editDisable: false,
        UpdateProcess: 'INSERT',
        excludeId: 0,
        Ex_Det_TMN: false,
        isDisableListConDet: true,
        SaveConditionDetail: {
          ddlExcludeScript: '',
          txtExclude: '',
          AdmitDt: '',
          ddlExcludeCause: '',
          ddlEndorsePrint: '',
        },
        SaveCancelConditionDetail: {
          ddlExcludeDettmncause: ''
        },
        ListDetailProcess: "INSERT",
        ExcludeDetId: 0
      };
    },

    created() {
      this.GetChannelType();
      this.GetExcludeScript();
      this.GetExcludeCause();
      this.GetExcludeTMNCause();
      this.GetEndorsePrinting();
    },

    mounted: function () {},

    updated() {

    },
    
    methods: {
      SearchingPolicy() {
        console.log("call SearchingPolicy() ")
        this.v$.SearchObject.$validate() // เช็คฟอร์มทั้งหมด
        if (!this.v$.SearchObject.$error) {
          this.Loading = true;
          http.post('EndorseCo/SearchingPolicy', {
            "PolicyNo": this.SearchObject.PolicyNo,
            "ChannelType": this.SearchObject.ddlChannelType,
            "PolicyHolding": this.ddlPolicyHolding,
          }).then(respond => {
            console.log(respond.data)
            this.CusName = respond.data.CusName;
            this.CartNo = respond.data.IdCardNo;
            let sBirthDate = respond.data.BirthDate.toString().split('/');
            let newbirthDate = sBirthDate[0].padStart(2, '0') + '/' + sBirthDate[1].padStart(2, '0') + '/' + (
              parseInt(sBirthDate[2])).toString()
            this.birthDate = ref([newbirthDate]);
            const today = (date) =>
              `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear() + 543)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            this.ExcludeTranDate = today(new Date());
            this.listOfConditionDT = respond.data.P_POL_EXCLUSION2;
            this.$store.state.isDisable = false;
            this.PolicyId = respond.data.PolicyId;
            this.P_POL_EXCLUSION_DETAIL_AND_CAUSE = respond.data.P_POL_EXCLUSION_DETAIL_AND_CAUSE;
            // let exIdActive = respond.data.P_POL_EXCLUSION2.filter(function (lstCondi) {
            //   return lstCondi.TMN == "N";
            // });
            let detailAvtive = respond.data.P_POL_EXCLUSION_DETAIL_AND_CAUSE.filter(function (elem) {
              return elem.EXCLUDE_ID == respond.data.P_POL_EXCLUSION2[0].EXCLUDE_ID;
            });
            this.detailListInsured = detailAvtive;
          }).catch(function (error) {
            console.log(error)
            Swal.fire({
              title: 'ไม่พบกรมธรรม์ที่ค้นหา!!!',
              text: '',
              icon: 'error',
            })
          }).finally(() => {
            this.Loading = false;
          });
        }
      },
      GetChannelType() {
        http.get('Services/GetChannelType', {}).then(respond => {
            this.channelTypeOptions = respond.data
            if (respond.data != null) {
              respond.data.forEach(e => {
                if (e.id == "OD") {
                  this.SearchObject.ddlChannelType = e.id;
                }
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetPolicyHolding() {
        if (this.ddlChannelType == "GM" || this.ddlChannelType == "HL") {
          http.post('Services/GetPolicyHolding', {
              "ChannelType": this.SearchObject.ddlChannelType
            }).then(respond => {
              this.policyHoldingOptions = respond.data
            })
            .catch(function (error) {
              console.log(error);
            })
        } else {
          this.policyHoldingOptions = '';
        }
      },
      GetExcludeScript() {
        http.get('Services/GetExcludeScript', {}).then(respond => {
            if (respond.data != null) {
              this.ExcludeScriptOptions = respond.data;
              this.SaveConditionDetail.ddlExcludeScript = respond.data[0].id;

            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetExcludeCause() {
        http.get('Services/GetExcludeCause', {}).then(respond => {
            if (respond.data != null) {
              this.ExcludeCauseOptions = respond.data;
              this.SaveConditionDetail.ddlExcludeCause = respond.data[0].id;

            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetExcludeTMNCause() {
        http.get('Services/GetExcludeTMNCause', {}).then(respond => {
            if (respond.data != null) {
              this.excludeDettmncauseOptions = respond.data;
              this.SaveCancelConditionDetail.ddlExcludeDettmncause = respond.data[0].id;
              this.excludeTmnCauseOptions = respond.data;
              this.SaveCancelCondition.ddlExcludeTmnCause = respond.data[0].id;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetEndorsePrinting() {
        http.get('Services/GetEndorsePrinting', {}).then(respond => {
            if (respond.data != null) {
              this.endorsePrintOptions = respond.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GenRef() {
        http.post('Services/GenRef', {
            "ChannelType": this.SearchObject.ddlChannelType
          }).then(respond => {
            if (respond.data != null) {
              if (this.ExcludeTmn) {
                this.SaveCancelCondition.CancelReference = respond.data.RefNo;
              } else {
                this.SaveCondition.Referance = respond.data.RefNo;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      ClearData() {
        this.$store.state.isDisable = true;
        this.SearchObject.PolicyNo = '';
        this.UpdateProcess = 'INSERT';
        this.PolicyId = '';
        this.listOfConditionDT = [];
        this.detailListInsured = [];
        this.CusName = '';
        this.CartNo = '';
        this.birthDate = '';
        this.ExcludeTranDate = '';
        this.SaveCondition.EffDate = '';
        this.SaveCondition.RefDate = '';
        this.SaveCondition.EndorseDate = '';
        this.SaveCondition.Referance = '';
        this.ExcludeTmn = false;
        this.SaveCancelCondition.CancelEndorseDate = '';
        this.SaveConditionDetail.txtExclude = '';
        this.SaveConditionDetail.AdmitDt = '';
        this.SaveConditionDetail.ddlEndorsePrint = '';
        this.editDisable = false;
        this.isDisableListConDet = true;
        this.excludeId = 0;
      },
      ConvertToDateTH(dateEN) {
        let sDate = dateEN.toString().split('/');
        let toDateTH = sDate[0] + '/' + sDate[1] + '/' + (parseInt(sDate[2]) + 543).toString();
        return toDateTH;
      },
      AddExclusion() {
        this.UpdateProcess = 'INSERT'
        console.log("AddExclusion")
        this.v$.SaveCondition.$validate()
        let canAdd = true;
        if (!this.v$.SaveCondition.$error) {
          this.listOfConditionDT.forEach(v => {
            if (v.TMN == 'N') {
              canAdd = false;
              this.$swal.fire({
                title: 'พบ CO เก่า ยังไม่ยกเลิก',
                text: '',
                icon: 'error',
              })
            }
          });
          if (canAdd) {
            let newRow = {
              EXCLUDE_TRN_DT: this.ExcludeTranDate,
              EFF_DT: this.ConvertToDateTH(this.SaveCondition.EffDate),
              REF_DT: this.ConvertToDateTH(this.SaveCondition.RefDate),
              Reference: this.SaveCondition.Referance,
              ENDORSE_DT: this.ConvertToDateTH(this.SaveCondition.EndorseDate),
              TMN: 'N',
              TMN_DESCRIPT: 'ไม่ยกเลิก',
              Underwrite_Name: 'อภิวัฒน์ คหะวงศ์',
              Underwrite_Id: '002705',
              UpdateProcess: this.UpdateProcess
            };
            this.listOfConditionDT.unshift(newRow);
          }

        }
      },
      EditExclusionID(excludeId) { // นำข้อมูลจาก input ที่แก้ไขแล้วมาแสดงคืนในตาราง
        this.listOfConditionDT.forEach(e => {
          if (e.EXCLUDE_ID == excludeId && this.ExcludeTmn) {
            let sCancelEndorseDate = this.SaveCancelCondition.CancelEndorseDate.split('/');
            e.CANCEL_ENDORSE_DT = sCancelEndorseDate[0] + '/' + sCancelEndorseDate[1] + '/' + (parseInt(
              sCancelEndorseDate[2]) + 543).toString();
            e.CANCEL_REFERENCE = this.SaveCancelCondition.CancelReference;
            let sClmtmneffdt = this.SaveCancelCondition.tmneffdt.split('/')
            e.clmtmneffdt = sClmtmneffdt[0] + '/' + sClmtmneffdt[1] + '/' + (parseInt(sClmtmneffdt[2]) + 543)
              .toString();
            e.EXC_TMN_CAUSE = this.SaveCancelCondition.ddlExcludeTmnCause
            e.TMN = 'Y';
            e.TMN_DESCRIPT = 'ยกเลิก';
          }
        });
      },
      editListOfCondition(excludeId, tmn) { // นำข้อมูลจากตารางมาแสดงใน input เพื่อแก้ไข
        if (tmn == "N") {
          this.UpdateProcess = 'EDIT'
          this.isDisableListConDet = false;
          this.editDisable = true;
          this.listOfConditionDT.forEach(e => {
            if (e.EXCLUDE_ID == excludeId) {
              this.SaveCondition.Referance = e.Reference;
              let sEffDate = e.EFF_DT.split('/');
              let effDate = sEffDate[0] + '/' + sEffDate[1] + '/' + parseInt(sEffDate[2] - 543).toString();
              this.SaveCondition.EffDate = effDate;

              let sRefDate = e.REF_DT.split('/');
              let refDate = sRefDate[0] + '/' + sRefDate[1] + '/' + parseInt(sRefDate[2] - 543).toString();
              this.SaveCondition.RefDate = refDate;

              let sEndorseDate = e.ENDORSE_DT.split('/')
              let endorseDate = sEndorseDate[0] + '/' + sEndorseDate[1] + '/' + parseInt(sEndorseDate[2] - 543)
                .toString();
              this.SaveCondition.EndorseDate = endorseDate;
              this.excludeId = e.EXCLUDE_ID;
            }
          });
        }

        let detailAvtive = this.P_POL_EXCLUSION_DETAIL_AND_CAUSE.filter(function (elem) {
          return elem.EXCLUDE_ID == excludeId;
        });
        this.detailListInsured = detailAvtive;
      },
      AddNewListDetail() { // Add จาก input เข้า ตาราง
        this.v$.SaveConditionDetail.$validate() // เช็คกรณีไม่ยกเลิก
        if (this.Ex_Det_TMN) {
          this.v$.SaveCancelConditionDetail.$validate() // เช็คกรณียกเลิก
        }
        if ((!this.v$.SaveConditionDetail.$error && this.Ex_Det_TMN == false) || (this.Ex_Det_TMN == true && !this.v$
            .SaveCancelConditionDetail.$error)) {
          let find = this.SaveConditionDetail.ddlExcludeCause.toString();
          let valObj = this.ExcludeCauseOptions.filter(function (elem) {
            if (elem.id.toString() == find) return elem.text;
          });

          let newRow = {
            EXCLUDE: this.SaveConditionDetail.txtExclude,
            ADMIT_DT_TEXT: this.SaveConditionDetail.AdmitDt,
            Exclude_Cause_Detail: valObj[0].text,
            EXCLUDE_CAUSE: this.SaveConditionDetail.ddlExcludeCause,
            ENDORSE_PRINTING_TEXT: this.SaveConditionDetail.ddlEndorsePrint,
            TMN_TEXT: this.Ex_Det_TMN == true ? "Y" : "N"
          };
          this.detailListInsured.unshift(newRow);
          console.log(this.detailListInsured)
        }
      },
      EditDetailInsuredInTable(excludeDetId) { // นำข้อมูลที่แก้ไขแล้วจาก input ไปใส่ในตาราง
        console.log('excludeDetId', excludeDetId)
        this.detailListInsured.forEach(e => {
          if (e.EXCLUDE_DET_ID == excludeDetId) {
            e.EXCLUDE = this.SaveConditionDetail.txtExclude

            let sAtmitDt = this.SaveConditionDetail.AdmitDt.split('/');
            let atmitDt = sAtmitDt[0] + '/' + sAtmitDt[1] + '/' + (parseInt(sAtmitDt[2]) + 543).toString();
            e.ADMIT_DT_TEXT = atmitDt;

            e.EXCLUDE_CAUSE = this.SaveConditionDetail.ddlExcludeCause
            let find = this.SaveConditionDetail.ddlExcludeCause.toString();
            let valObj = this.ExcludeCauseOptions.filter(function (elem) {
              if (elem.id.toString() == find) return elem.text;
            });
            e.Exclude_Cause_Detail = valObj[0].text
          }
        });
      },
      EditDetailInsured(excludeDetId) { // เอาข้อมูลตารางไปแสดงใน input
        this.ListDetailProcess = "EDIT";
        this.detailListInsured.forEach(e => {
          if (e.EXCLUDE_DET_ID == excludeDetId) {
            this.SaveConditionDetail.txtExclude = e.EXCLUDE;

            let sAtmitDt = e.ADMIT_DT_TEXT.split('/');
            let atmitDt = sAtmitDt[0] + '/' + sAtmitDt[1] + '/' + parseInt(sAtmitDt[2] - 543).toString();
            this.SaveConditionDetail.AdmitDt = atmitDt;

            this.SaveConditionDetail.ddlExcludeCause = e.EXCLUDE_CAUSE;
            this.SaveConditionDetail.ddlEndorsePrint = e.ENDORSE_PRINTING_TEXT
            this.ExcludeDetId = e.EXCLUDE_DET_ID;
            console.log('this.ExcludeDetId ', this.ExcludeDetId)
          }
        });
      },
      SaveData() {
        this.$swal.fire({
          title: 'ต้องการบันทึกสลักหลังเสนอ CO หรือไม่ ?',
          text: '',
          icon: 'question',
          confirmButtonText: 'ยืนยัน',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            let arrTest = [];
            arrTest.push(this.listOfConditionDT[0]);
            http.post('EndorseCo/SaveData', {
                "txtPolicyNo": this.SearchObject.PolicyNo,
                "ChannelType": this.SearchObject.ddlChannelType,
                "PolicyId": this.PolicyId,
                "UpdateProcess": this.UpdateProcess,
                "UserID": '002705',
                "P_POL_EXCLUSION2": arrTest,
                "P_POL_EXCLUSION_DETAIL_AND_CAUSE": this.detailListInsured

              }).then(respond => {
                Swal.fire({
                  title: 'บันทึกสำเร็จ!!!',
                  text: '',
                  icon: 'success',
                })
                this.ClearData();
              })
              .catch(function (error) {
                Swal.fire({
                  title: 'ผิดพลาด!!!',
                  text: error,
                  icon: 'error',
                })
              })

          }
        })
      }
    },

    validations() {
      return {
        SearchObject: {
          ddlChannelType: {
            required: helpers.withMessage('กรุณาเลือกช่องทางการขาย', required)
          },
          PolicyNo: {
            required: helpers.withMessage('กรุณากรอกเลขกรมธรรม์', required)
          }
        },
        SaveCondition: {
          EffDate: {
            required: helpers.withMessage('กรุณาเลือกวันที่มีผล', required)
          },
          RefDate: {
            required: helpers.withMessage('กรุณาเลือกวันที่ออกหนังสือCO', required)
          },
          EndorseDate: {
            required: helpers.withMessage('กรุณาเลือกวันที่สลักหลัง', required)
          },
          Referance: {
            required: helpers.withMessage('กรุณากรอกเลขที่สลักหลัง', required)
          },
        },
        SaveCancelCondition: {
          CancelEndorseDate: {
            required: helpers.withMessage('กรุณากรอกวันที่สลักหลัง', required)
          },
          CancelReference: {
            required: helpers.withMessage('กรุณากรอกเลขที่สลักหลัง', required)
          },
          tmneffdt: {
            required: helpers.withMessage('กรุณากรอกวันที่มีผลการยกเลิก', required)
          },
          ddlExcludeTmnCause: {
            required: helpers.withMessage('กรุณาเลือกสาเหตุการยกเลิก', required)
          },
        },
        SaveConditionDetail: {
          ddlExcludeScript: {
            required: helpers.withMessage('กรุณาระบุข้อความเสนอเงื่อนไข', required)
          },
          txtExclude: {
            required: helpers.withMessage('กรุณาระบุข้อความเสนอเงื่อนไข', required)
          },
          AdmitDt: {
            required: helpers.withMessage('กรุณาระบุวันที่ตอบรับ', required)
          },
          ddlExcludeCause: {
            required: helpers.withMessage('กรุณาระบุสาเหตุ', required)
          },
          ddlEndorsePrint: {
            required: helpers.withMessage('กรุณาระบุเงื่อนไขการพิมพ์สลักหลัง', required)
          },
        },
        SaveCancelConditionDetail: {
          ddlExcludeDettmncause: {
            required: helpers.withMessage('กรุณาระบุสาเหตุการยกเลิก', required)
          },
        },
      }
    },


  };
</script>

<style lang="css">
  select.form-control {
    width: 400px !important;
  }

  .ddl-Exclude-tmn-cause>select.form-control {
    width: 200px !important;
  }

  .ddl-cancel>select.form-control {
    width: 150px !important;
  }

  .ddl-Exclude-Script>select.form-control {
    width: 550px !important;
  }
</style>