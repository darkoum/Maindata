import { UtilService } from "src/app/services/util.service";
import { HttpService } from "src/app/services/http.service";
import { Component, OnInit } from "@angular/core";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";

@Component({
    standalone: false,
  selector: "app-prgstudentmaster",
  templateUrl: "./prgstudentmaster.component.html",
  styleUrls: ["./prgstudentmaster.component.css"],
})
export class PrgstudentmasterComponent implements OnInit {
  studentgrouplist;
  programlist;
  departmentlist;
  studentstatuslist;

  programid;
  facultyid;
  departmentid;
  levelid;
  studentstatus = "10";

  constructor(
    private data: HttpService,
    private alert: AlertService,
    private util: UtilService,
    private routes: Router
  ) {
    locale("th");
    if (sessionStorage.getItem("studentcodesearch") != null) {
      this.studentcode = sessionStorage.getItem("studentcodesearch");
      this.getstu();
      sessionStorage.removeItem("studentcodesearch");
    }
  }
  // Prgstudentmaster Variable
  stulist: any[] = [];
  // studentcode: string = '67111140041';
  studentcode: string = null;
  editmodeopen: boolean = false;
  sysbytelist: any = [];
  sysbytenumlist: any = [];
  groupyear: string = null;
  facid: any;
  prolist: any = [];
  loadingVisible: boolean = false;
  studentname: string = null;
  studentsurname: string = null;
  submit = false;
  svalue: string;
  depid: any;
  proid: number = 0;
  citizenid: string = null;
  studentgroup: string = null;
  faclist: any = [];
  camlist: any = [];
  faccombo: any = [];
  levlist: any = [];
  prefix: any = [];
  milist: any = [];
  fprefix: any;
  mprefix: any = [];
  cprefix: any = [];
  pprefix: any = [];
  acadlist: any = [];
  deplist: any = [];
  grouplist2: any = [];
  offlist: any = [];
  feegrolist: any = [];
  grouplist: any = [];
  schgrolist: any = [];
  nationlist: any = [];
  religionlist: any = [];
  birthprovincelist: any = [];
  schoollist: any = [];
  entrydegree: any = [];
  hplist: any = [];
  hdlist: any = [];
  hsdlist: any = [];
  fplist: any = [];
  fclist: any = []
  mclist: any = []
  foplist: any = [];
  fdlist: any = [];
  fsdlist: any = [];
  fodlist: any = [];
  fosdlist: any = [];
  modlist: any = [];
  mosdlist: any = [];
  mplist: any = [];
  moplist: any = [];
  mdlist: any = [];
  msdlist: any = [];
  cplist: any = [];
  cdlist: any = [];
  csdlist: any = [];
  pplist: any = [];
  pdlist: any = [];
  psdlist: any = [];
  podlist: any = [];
  posdlist: any = [];
  ccplist: any = [];
  ccdlist: any = [];
  ccsdlist: any = [];
  oplist: any = [];
  odlist: any = [];
  osdlist: any = [];
  fnationid: any = [];
  freligionid: any = [];
  mnationid: any = [];
  mreligionid: any = [];
  tmpstudentid: any;
  depcombo: any = [];
  procombo: any = [];
  programgralist: any;
  foodallergieslist: any = [];
  documentstatuslist: any = [];

  admstatusidlist;
  englishresultlist;
  webflag = [
    { key: "Y", value: "Y : ปกติ" },
    { key: "A", value: "A : Lock System โดยที่ปรึกษา" },
    { key: "B", value: "B : Lock ลงทะเบียน โดยที่ปรึกษา" },
    { key: "J", value: "J : Lock System โดยเจ้าหน้าที่" },
    { key: "K", value: "K : Lock ลงทะเบียน โดยเจ้าหน้าที่" },
  ];
  lstfinancestatus: any[] = [];
  lstcombodeform: any = {};
  lstcombovisatype: any = {};
  // Add for RSU
  // occup
  foccup: any=[];
  moccup: any=[];
  poccup: any=[];
  // degree
  fdegree: any=[];
  mdegree: any=[];
  pdegree: any=[];
  // revenue
  frevenue: any=[]
  mrevenue: any=[]
  prevenue: any=[]

  // Mask and validation
  citizeneditorOptions = {
    // mask: '+1 (X00) 000-0000',
    mask: `0 0000 00000 00 0`,
    maskRules: {
      X: /[02-9]/,
    },
    maskInvalidMessage: 'เลขบัตรประชาชนต้องมี 13 หลัก',
    valueChangeEvent: 'keyup'
    }
    phoneeditorOptions = {
        mask: '(X00) 000-0000',
        // mask: `000-000-0000`,
        maskRules: {
        X: /[02-9]/,
        },
        maskInvalidMessage: 'หมายเลขโทรศัพท์ต้องมี 10 หลัก',
        valueChangeEvent: 'keyup'
    }
  ngOnInit(): void {
    this.getCombo();
    this.getPrepareData();
    this.bindingMethod();
    // this.facid = null;
    // this.studentcode = '6514200110'
    // setTimeout(() => {
    //   this.onSearch();
    // }, 1000);
  }
  getCombo() {
    // *Sysbytedes for admstatusidlist
    this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/STUDENTSTATUS").then((response: any) => (this.studentstatuslist = response));
    this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTMASTER/FINANCESTATUS").then((response: any) => (this.lstfinancestatus = response));
    this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTMASTER/ADMSTATUSID").then((response: any) => (this.admstatusidlist = response));
    // *Sysbytedes for Englist result
    this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTMASTER/ENGLISHRESULT").then((response: any) => (this.englishresultlist = response));
    // *Combo for sysbytedes only use in prgstudentmaster
    this.data.get(`ComboSysbyt/getsysbytedesbycondition/${"TABLENAME IN ('STUDENTMASTER', 'STUDENTSTATUS', 'STUDENTBIO', 'ENTRYDEGREE')"}`).then(async (resp: any) => {
        this.sysbytelist = await resp;
    });
    this.data.get(`ComboSysbyt/getsysbytedesbyconditionnum/${"TABLENAME IN ('STUDENTSTATUS', 'STUDENTBIO') AND COLUMNNAME IN ('STUDENTSTATUS', 'ORIGINID')"}`).then(async (resp: any) => {
        this.sysbytenumlist = await resp;
    });
    // *Combo for Department
    this.data.get("ComboDep/All").then((resp: any) => {
      this.deplist = resp;
    });
    // *Combo for Studentset
    this.data.get(`ComboStuset/All`).then((resp: any) => {
      this.grouplist2 = resp;
    });
    // *Combo for Faculty
    this.data.getcombo("ComboFac/Byfacultytype").then((resp: any) => {
      this.faclist = resp;
      this.faccombo = resp;
    });
    // *Combo for Campus
    this.data.getcombo("ComboCam/All").then((resp: any) => {
      this.camlist = resp;
    });
    // *Combo for Prefixname
    this.data.getcombo("ComboPre/All").then((resp: any) => {
      this.prefix = resp;
      this.fprefix = resp;
      this.mprefix = resp;
      this.cprefix = resp;
      this.pprefix = resp;
    });
    // *Combo for Level
    this.data.getcombo("ComboLev/All").then((resp: any) => {
      this.levlist = resp;
    });
    // *Combo for Acadlist
    this.data.getcombo("ComboAca/All").then((resp: any) => {
      this.acadlist = resp;
    });
    // *Combo for School
    this.data.getcombo("ComboScho/All").then((resp: any) => {
      this.schoollist = resp;
    });
    // *Combo for nation
    this.data.getcombo("ComboNat/All").then((resp: any) => {
      this.nationlist = resp;
      this.fnationid = resp;
      this.mnationid = resp;
    });
    // *Combo for Religion
    this.data.getcombo("ComboRel/All").then((resp: any) => {
      this.religionlist = resp;
      this.freligionid = resp;
      this.mreligionid = resp;
    });
    // *Combo for Entrydegree
    this.data.getcombo("ComboEntdee/All").then((resp: any) => {
      this.entrydegree = resp;
    });
    // *Combo for Province
    this.data.get("ComboProv/All").then((resp: any) => {
      this.hplist = resp;
      this.cplist = resp;
      this.ccplist = resp;
      this.pplist = resp;
      this.oplist = resp;
      this.fplist = resp;
      this.foplist = resp;
      this.mplist = resp;
      this.moplist = resp;
      this.birthprovincelist = resp;
    });
    this.data.get("ComboPro/Allmajor").then((resp: any) => {
      this.programgralist = resp;
    });
    this.data.get("ComboPro/Allminor").then((resp: any) => {
      this.milist = resp;
    });
    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/DEFORMCODE`).then((resp: any) => {
      this.lstcombodeform = resp;
    });
    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/VISATYPE`).then((resp: any) => {
      this.lstcombovisatype = resp;
    });
    this.data.getcombo(`ComboCouTry/All`).then((resp: any) => {
      this.fclist = resp
      this.mclist = resp
    });
    this.data.getcombo(`ComboSysbyt/getSysbytedes` + '/' + 'STUDENTBIO' + '/' + 'FOODALLERGIES').then((resp:any) => {
        this.foodallergieslist = resp;
    });
  }
  getPrepareData() {
    // *Officer's Data
    this.data.getcombo("Prgstudentmaster/Allofficer").then((resp: any) => {
      this.offlist = resp;
    });
    // *Schedule Group
    this.data
      .getcombo("Prgstudentmaster/Allschedulegroup")
      .then((resp: any) => {
        this.schgrolist = resp;
      });
    // *feegroup data
    this.data.getcombo("Prgstudentmaster/Allfeegroup").then((resp: any) => {
      this.feegrolist = resp;
    });
    // *District Data
    this.data.get("Prgstudentmaster/Alldistrict").then((resp: any) => {
      this.hdlist = resp;
      this.cdlist = resp;
      this.ccdlist = resp;
      this.pdlist = resp;
      this.odlist = resp;
      this.fdlist = resp;
      this.fodlist = resp;
      this.mdlist = resp;
      this.modlist = resp;
      this.podlist = resp;
    });
    // *Subdistrict Data
    this.data.get("Prgstudentmaster/Allsubdistrict").then((resp: any) => {
      this.hsdlist = resp;
      this.csdlist = resp;
      this.ccsdlist = resp;
      this.psdlist = resp;
      this.osdlist = resp;
      this.fsdlist = resp;
      this.fosdlist = resp;
      this.msdlist = resp;
      this.mosdlist = resp;
      this.posdlist = resp;
    });
    this.getComboOfParent();
  }
  getComboOfParent(){
    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/FATHEROCCUP`).then((resp: any) => {
      this.foccup = resp;
    })
    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/MOTHEROCCUP`).then((resp: any) => {
      this.moccup = resp;
    })
    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/PARENTOCCUP`).then((resp: any) => {
      this.poccup = resp;
    })
    this.data.getcombo(`combosysbyt/getSysbytedes/STUDENTBIO/FATHERREVENUE`).then((resp: any) => {
      this.frevenue = resp;
    })
    this.data.getcombo(`combosysbyt/getSysbytedes/STUDENTBIO/MOTHERREVENUE`).then((resp: any) => {
      this.mrevenue = resp;
    })
    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/PARENTREVENUE`).then((resp: any) => {
      this.prevenue = resp;
    })

    this.data.getcombo(`ComboSysbyt/getSysbytedes/STUDENTBIO/DOCUMENTSTATUS`).then((resp: any) => {
      this.documentstatuslist = resp;
    })
  }
  bindingMethod() {
    this.getFilteredEntrytype = this.getFilteredEntrytype.bind(this);
    this.getFilteredHDistrict = this.getFilteredHDistrict.bind(this);
    this.getFilteredHSubDistrict = this.getFilteredHSubDistrict.bind(this);
    // this.getforiginlist = this.getforiginlist.bind(this);
    this.getFilteredFZipcode = this.getFilteredFZipcode.bind(this);
    this.getFilteredFSubDistrict = this.getFilteredFSubDistrict.bind(this);
    this.getFilteredFDistrict = this.getFilteredFDistrict.bind(this);
    this.getFilteredFODistrict = this.getFilteredFODistrict.bind(this);
    this.getFilteredFOSubDistrict = this.getFilteredFOSubDistrict.bind(this);
    this.getfstatus = this.getfstatus.bind(this);
    this.getfoccup = this.getfoccup.bind(this);
    this.getfrevenue = this.getfrevenue.bind(this);
    this.setFsubdistrictValue = this.setFsubdistrictValue.bind(this);
    this.setFOsubdistrictValue = this.setFOsubdistrictValue.bind(this);
    this.getFilteredMDistrict = this.getFilteredMDistrict.bind(this);
    this.getFilteredMSubDistrict = this.getFilteredMSubDistrict.bind(this);
    this.getFilteredMODistrict = this.getFilteredMODistrict.bind(this);
    this.getFilteredMOSubDistrict = this.getFilteredMOSubDistrict.bind(this);
    this.setMOsubdistrictValue = this.setMOsubdistrictValue.bind(this);
    this.getmoriginlist = this.getmoriginlist.bind(this);
    this.setMsubdistrictValue = this.setMsubdistrictValue.bind(this);
    this.getmstatus = this.getmstatus.bind(this);
    this.getmoccup = this.getmoccup.bind(this);
    this.getmrevenue = this.getmrevenue.bind(this);
    this.getFilteredPODistrict = this.getFilteredPODistrict.bind(this);
    this.getFilteredPOSubDistrict = this.getFilteredPOSubDistrict.bind(this);
    this.setPOsubdistrictValue = this.setPOsubdistrictValue.bind(this);
    this.getFilteredPDistrict = this.getFilteredPDistrict.bind(this);
    this.getFilteredPSubDistrict = this.getFilteredPSubDistrict.bind(this);
    this.getprelation = this.getprelation.bind(this);
    // this.setPdistrictValue = this.setPdistrictValue.bind(this);
    this.getpstatus = this.getpstatus.bind(this);
    this.getpoccup = this.getpoccup.bind(this);
    this.getprevenue = this.getprevenue.bind(this);

    this.getFilteredODistrict = this.getFilteredODistrict.bind(this);
    this.getFilteredOSubDistrict = this.getFilteredOSubDistrict.bind(this);
    this.setOsubdistrictValue = this.setOsubdistrictValue.bind(this);
    this.setCCsubdistrictValue = this.setCCsubdistrictValue.bind(this);
    this.setHsubdistrictValue = this.setHsubdistrictValue.bind(this);
    this.setCsubdistrictValue = this.setCsubdistrictValue.bind(this);
    this.setPsubdistrictValue = this.setPsubdistrictValue.bind(this);
    this.getfmpdegree = this.getfmpdegree.bind(this);
    // filter currentaddress
    this.getFilteredCDistrict = this.getFilteredCDistrict.bind(this);
    this.getFilteredCSubDistrict = this.getFilteredCSubDistrict.bind(this);
    // this.setCprovinceValue = this.setCprovinceValue.bind(this);
    // this.setCdistrictValue = this.setCdistrictValue.bind(this);
    // this.setCsubdistrictValue = this.setCsubdistrictValue.bind(this);

    this.getFilteredCCDistrict = this.getFilteredCCDistrict.bind(this);
    this.getFilteredCCSubDistrict = this.getFilteredCCSubDistrict.bind(this);
    this.getFilteredrelationlist = this.getFilteredrelationlist.bind(this);
    this.getFilteredWorkingStatus = this.getFilteredWorkingStatus.bind(this);
    this.getFilteredGroup2 = this.getFilteredGroup2.bind(this);
    this.getFilteredGra = this.getFilteredGra.bind(this);
    this.getstalist = this.getstalist.bind(this);
    this.getbloodgroup = this.getbloodgroup.bind(this);
    this.getentryplan = this.getentryplan.bind(this);
    this.getdocumentstatus = this.getdocumentstatus.bind(this);
    this.getgraduatecheck = this.getgraduatecheck.bind(this);
    this.getfmpdegree = this.getfmpdegree.bind(this);
    this.getcontactto = this.getcontactto.bind(this);
    this.getworkingstate = this.getworkingstate.bind(this);
    this.getdeformcode = this.getdeformcode.bind(this);
    this.gettalent = this.gettalent.bind(this);
    this.getmaritalstatus = this.getmaritalstatus.bind(this);
    this.getfundstatus = this.getfundstatus.bind(this);
    this.getoriginlist = this.getoriginlist.bind(this);
    this.getincomefrom = this.getincomefrom.bind(this);
    this.getincomepermonth = this.getincomepermonth.bind(this);
    this.getexpensespermonth = this.getexpensespermonth.bind(this);
    this.getFilteredDep = this.getFilteredDep.bind(this);
  }
  // getfmpdegree(options: any) {
  //       return {
  //           store: this.sysbytelist,
  //           filter: options.data ?   [['keystr1id', '=', "ENTRYDEGREE"] , 'and' , ['keystr2id', '=', 'ENTRYDEGREELEVEL']] : null,
  //           paginate: true,  pageSize: 10
  //       };
  //   }
  getFilteredDep(options: any) {
    return {
      store: this.deplist,
      filter: options.data ? ["key1id", "=", options.data.facultyid] : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredGra(options: any) {
    return {
      store: this.programgralist,
      filter: options.data
        ? [
            ["key1id", "=", options.data.levelid],
          ]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getDepcombo() {
    this.depid = null;
    if (this.facid) {
      this.data.getcombo("ComboDep/GetbyFac/" + this.facid).then((rep: any) => {
        this.depcombo = rep;
      });
    } else {
      this.depcombo = [];
    }
  }
  getprocombo() {
    let strwhere = "";
    if (this.depid >= 0 && this.depid != null) {
      this.data
        .getcombo("ComboPro/Getbyfacdepid/" + this.facid + "/" + this.depid)
        .then((resp: any) => {
          this.procombo = resp;
        });
    } else {
      this.procombo = [];
    }
  }
  selectionChanged(data: any) {
    if (!this.editmodeopen) {
      if (data.currentSelectedRowKeys.length > 0) {
        this.tmpstudentid = data.selectedRowKeys[0].tmpstudentid;
      } else {
        this.tmpstudentid = null;
      }
    } else {
      this.alert.Warning(1);
    }
  }
  getFilteredHDistrict(options: any) {
    return {
      store: this.hdlist,
      filter: options.data
        ? ["provinceid", "=", options.data.homeprovinceid]
        : null,
    };
  }
  getFilteredHSubDistrict(options: any) {
    return {
      store: this.hsdlist,
      filter: options.data
        ? ["districtid", "=", options.data.homedistrict]
        : null,
    };
  }
  getFilteredHZipcode(options: any) {
    return {
      store: this.hsdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.homesubdistrict]
        : null,
    };
  }
  getFilteredFDistrict(options: any) {
    return {
      store: this.fdlist,
      filter: options.data
        ? ["provinceid", "=", options.data.fatherprovinceid]
        : null,
    };
  }
  getFilteredFSubDistrict(options: any) {
    return {
      store: this.fsdlist,
      filter: options.data
        ? ["districtid", "=", options.data.fatherdistrict]
        : null,
    };
  }
  getFilteredFZipcode(options: any) {
    return {
      store: this.fsdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.fathersubdistrict]
        : null,
    };
  }
  getFilteredFODistrict(options: any) {
    return {
      store: this.fodlist,
      filter: options.data
        ? ["provinceid", "=", options.data.fatherofficeprovinceid]
        : null,
    };
  }
  getFilteredFOSubDistrict(options: any) {
    return {
      store: this.fosdlist,
      filter: options.data
        ? ["districtid", "=", options.data.fatherofficedistrict]
        : null,
    };
  }
  getFilteredMDistrict(options: any) {
    return {
      store: this.mdlist,
      filter: options.data
        ? ["provinceid", "=", options.data.motherprovinceid]
        : null,
    };
  }
  getFilteredMSubDistrict(options: any) {
    return {
      store: this.msdlist,
      filter: options.data
        ? ["districtid", "=", options.data.motherdistrict]
        : null,
    };
  }
  getFilteredMZipcode(options: any) {
    return {
      store: this.msdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.mothersubdistrict]
        : null,
    };
  }
  getFilteredMODistrict(options: any) {
    return {
      store: this.modlist,
      filter: options.data
        ? ["provinceid", "=", options.data.motherofficeprovinceid]
        : null,
    };
  }
  getFilteredMOSubDistrict(options: any) {
    return {
      store: this.mosdlist,
      filter: options.data
        ? ["districtid", "=", options.data.motherofficedistrict]
        : null,
    };
  }
  getFilteredMOZipcode(options: any) {
    return {
      store: this.mosdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.motherofficesubdistrict]
        : null,
    };
  }
  getFilteredPODistrict(options: any) {
    return {
      store: this.podlist,
      filter: options.data
        ? ["provinceid", "=", options.data.parentofficeprovinceid]
        : null,
    };
  }
  getFilteredPOSubDistrict(options: any) {
    return {
      store: this.posdlist,
      filter: options.data
        ? ["districtid", "=", options.data.parentofficedistrict]
        : null,
    };
  }
  getFilteredPOZipcode(options: any) {
    return {
      store: this.posdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.parentofficesubdistrict]
        : null,
    };
  }
  setHprovinceValue(rowData: any, value: any): void {
    rowData.homedistrict = null;
    rowData.homesubdistrict = null;
    rowData.homezipcode = null;
    //this.homeprovinceid = value;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setHdistrictValue(rowData: any, value: any): void {
    rowData.homesubdistrict = null;
    rowData.homezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setHsubdistrictValue(rowData: any, value: any) {
    rowData.homesubdistrict = value;
    rowData.homezipcode = await this.getOzipcode(value);
  }
  setFprovinceValue(rowData: any, value: any): void {
    rowData.fatherdistrict = null;
    rowData.fathersubdistrict = null;
    rowData.fatherzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  setFdistrictValue(rowData: any, value: any): void {
    rowData.fathersubdistrict = null;
    rowData.fatherzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setFsubdistrictValue(rowData: any, value: any) {
    rowData.fathersubdistrict = value;
    rowData.fatherzipcode = await this.getOzipcode(value);
  }
  setFOprovinceValue(rowData: any, value: any): void {
    rowData.fatherofficedistrict = null;
    rowData.fatherofficesubdistrict = null;
    rowData.fatherofficezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setFOdistrictValue(rowData: any, value: any): void {
    rowData.fatherofficesubdistrict = null;
    rowData.fatherofficezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setFOsubdistrictValue(rowData: any, value: any) {
    rowData.fatherofficesubdistrict = value;
    rowData.fatherofficezipcode = await this.getOzipcode(value);
  }
  setMprovinceValue(rowData: any, value: any): void {
    rowData.motherdistrict = null;
    rowData.mothersubdistrict = null;
    rowData.motherzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setMdistrictValue(rowData: any, value: any): void {
    rowData.mothersubdistrict = null;
    rowData.motherzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setMsubdistrictValue(rowData: any, value: any) {
    rowData.mothersubdistrict = value;
    rowData.motherzipcode = await this.getOzipcode(value);
  }
  setMOprovinceValue(rowData: any, value: any): void {
    rowData.motherofficedistrict = null;
    rowData.motherofficesubdistrict = null;
    rowData.motherofficezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setMOdistrictValue(rowData: any, value: any): void {
    rowData.motherofficesubdistrict = null;
    rowData.motherofficezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setMOsubdistrictValue(rowData: any, value: any) {
    rowData.motherofficesubdistrict = value;
    rowData.motherofficezipcode = await this.getOzipcode(value);
  }
  setPOprovinceValue(rowData: any, value: any): void {
    rowData.parentofficedistrict = null;
    rowData.parentofficesubdistrict = null;
    rowData.parentofficezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setPOdistrictValue(rowData: any, value: any): void {
    rowData.parentofficesubdistrict = null;
    rowData.parentofficezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setPOsubdistrictValue(rowData: any, value: any) {
    rowData.parentofficesubdistrict = value;
    rowData.parentofficezipcode = await this.getOzipcode(value);
  }
  getFilteredCDistrict(options: any) {
    return {
      store: this.cdlist,
      filter: options.data
        ? ["provinceid", "=", options.data.currentprovinceid]
        : null,
    };
  }
  getFilteredCSubDistrict(options: any) {
    return {
      store: this.csdlist,
      filter: options.data
        ? ["districtid", "=", options.data.currentdistrict]
        : null,
    };
  }
  getFilteredCZipcode(options: any) {
    return {
      store: this.csdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.currentsubdistrict]
        : null,
    };
  }
  setCprovinceValue(rowData: any, value: any): void {
    rowData.currentdistrict = null;
    rowData.currentsubdistrict = null;
    rowData.currentzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setCdistrictValue(rowData: any, value: any) {
    // rowData.currentdistrict = value
    rowData.currentsubdistrict = null;
    rowData.currentzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setCsubdistrictValue(rowData: any, value: any) {
    rowData.currentsubdistrict = value
    // rowData.currentzipcode = await this.getZipbyDis(value)
    rowData.currentzipcode = await this.getCzipcode(value)
  }
  getFilteredCCDistrict(options: any) {
    return {
      store: this.ccdlist,
      filter: options.data
        ? ["provinceid", "=", options.data.contactprovinceid]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredCCSubDistrict(options: any) {
    return {
      store: this.ccsdlist,
      filter: options.data
        ? ["districtid", "=", options.data.contactdistrict]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredCCZipcode(options: any) {
    return {
      store: this.ccsdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.contactsubdistrict]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  setCCprovinceValue(rowData: any, value: any): void {
    rowData.contactdistrict = null;
    rowData.contactsubdistrict = null;
    rowData.contactzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setCCdistrictValue(rowData: any, value: any): void {
    rowData.contactsubdistrict = null;
    rowData.contactzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setCCsubdistrictValue(rowData: any, value: any) {
    rowData.contactsubdistrict = value;
    rowData.contactzipcode = await this.getOzipcode(value);
  }
  getFilteredPDistrict(options: any) {
    return {
      store: this.pdlist,
      filter: options.data
        ? ["provinceid", "=", options.data.parentprovinceid]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredPSubDistrict(options: any) {
    return {
      store: this.psdlist,
      filter: options.data
        ? ["districtid", "=", options.data.parentdistrict]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  setPprovinceValue(rowData: any, value: any): void {
    rowData.parentdistrict = null;
    rowData.parentsubdistrict = null;
    rowData.parentzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setPdistrictValue(rowData: any, value: any): void {
    // rowData.parentdistrict = value
    rowData.parentsubdistrict = null;
    rowData.parentzipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setPsubdistrictValue(rowData: any, value: any) {
    rowData.parentsubdistrict = value;
    rowData.parentzipcode = await this.getPzipcode(value);
  }
  getFilteredODistrict(options: any) {
    return {
      store: this.odlist,
      filter: options.data
        ? ["provinceid", "=", options.data.officeprovinceid]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredOSubDistrict(options: any) {
    return {
      store: this.osdlist,
      filter: options.data
        ? ["districtid", "=", options.data.officedistrict]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredEntrytype(options: any) {
    return {
      store: this.sysbytelist,
      filter: options.data
        ? [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "ENTRYTYPE"],
          ]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredrelationlist(options: any) {
    return {
      store: this.sysbytelist,
      filter: options.data
        ? [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PARENTRELATION"],
          ]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredWorkingStatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: options.data
        ? [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "WORKINGSTATUS"],
          ]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  getFilteredOZipcode(options: any) {
    return {
      store: this.osdlist,
      filter: options.data
        ? ["sub_districtid", "=", options.data.officesubdistrict]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  setOprovinceValue(rowData: any, value: any): void {
    rowData.officedistrict = null;
    rowData.officesubdistrict = null;
    rowData.officezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setOdistrictValue(rowData: any, value: any): void {
    rowData.officesubdistrict = null;
    rowData.officezipcode = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  async setOsubdistrictValue(rowData: any, value: any) {
    rowData.officesubdistrict = value;
    rowData.officezipcode = await this.getOzipcode(value);
  }
  getOzipcode(sdid: any) {
    return new Promise((resolve) => {
      this.data
        .get("Prgstudentmaster/Getsubdisbysubdisid/" + sdid)
        .then((response: any) => {
          if (response.length > 0) {
            resolve(response[0].zipcode);
          } else {
            resolve("");
          }
        });
    });
  }
  getCzipcode(did: any) {
    return new Promise((resolve) => {
      this.data
        .get("Prgstudentmaster/Getsubdisbysubdisid/" + did)
        .then((response: any) => {
          if (response.length > 0) {
            resolve(response[0].zipcode);
          } else {
            resolve("");
          }
        });
    });
  }
  getPzipcode(did: any) {
    return new Promise((resolve) => {
      this.data
        .get("Prgstudentmaster/Getsubdisbysubdisid/" + did)
        .then((response: any) => {
          if (response.length > 0) {
            resolve(response[0].zipcode);
          } else {
            resolve("");
          }
        });
    });
  }
  getZipbyDis(did: any) {
    return new Promise((resolve) => {
      this.data
        .get("Prgstudentmaster/Getsubdisbydisid/" + did)
        .then((response: any) => {
          if (response.length > 0) {
            resolve(response[0].zipcode);
          } else {
            resolve("");
          }
        });
    });
  }
  updateSchool(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  getstalist(options: any) {

    // store: this.sysbytenumlist.filter(res => res.keystr1id === "STUDENTSTATUS" && res.keystr2id === "STUDENTSTATUS" )  
    return {
      store: this.sysbytenumlist,
      filter: [
            ["keystr1id", "=", "STUDENTSTATUS"],
            "and",
            ["keystr2id", "=", "STUDENTSTATUS"],
          ],
      paginate: true,
      pageSize: 10,     
    };    
  }

  getfmpdegree(options: any) {
    return {
      store: this.sysbytelist,
      filter:  [
            ["keystr1id", "=", "ENTRYDEGREE"],
            "and",
            ["keystr2id", "=", "ENTRYDEGREELEVEL"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getcontactto(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
        [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PARENTRELATION"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getbloodgroup(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "BLOODGROUP"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getentryplan(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "ENTRYPLAN"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getdocumentstatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "DOCUMENTSTATUS"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getgraduatecheck(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PASSSTATUS"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getfstatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "FATHERSTATUS"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getfoccup(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "FATHEROCCUP"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getfrevenue(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "FATHERREVENUE"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getmstatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
        [
          ["keystr1id", "=", "STUDENTBIO"],
           "and",
          ["keystr2id", "=", "MOTHERSTATUS"],
        ],
      paginate: true,
      pageSize: 10,
    };
  }
  getmoccup(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "MOTHEROCCUP"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getmrevenue(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "MOTHERREVENUE"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getpstatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PARENTSTATUS"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getpoccup(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PARENTOCCUP"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getprevenue(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PARENTREVENUE"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getprelation(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "PARENTRELATION"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getworkingstate(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "WORKINGSTATE"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getdeformcode(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "DEFORMCODE"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  gettalent(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "TALENT"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getmaritalstatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "MARITALSTATUS"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getfundstatus(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "FUNDSTATUS"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getoriginlist(options: any) {
    return {
      store: this.sysbytenumlist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "ORIGINID"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getforiginlist(options: any) {
    return {
      store: this.sysbytenumlist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "ORIGINID"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getmoriginlist(options: any) {
    return {
      store: this.sysbytenumlist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "ORIGINID"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getincomefrom(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "INCOMEFROM"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getexpensespermonth(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "EXPENSESPERMONTH"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }
  getincomepermonth(options: any) {
    return {
      store: this.sysbytelist,
      filter: 
         [
            ["keystr1id", "=", "STUDENTBIO"],
            "and",
            ["keystr2id", "=", "INCOMEPERMONTH"],
          ],
      paginate: true,
      pageSize: 10,
    };
  }

  getgrouplist() {
    //&& this.util.ntz(this.facid) != -9
    if (
      this.util.ntb(this.groupyear) != "null" &&
      this.util.ntz(this.facid) != -9
    ) {
      this.data
        .getcombo("ComboStuset/bygropyearfac/" + this.util.ntb(this.groupyear) + "/" + this.util.ntz(this.facid))
        .then((rep: any) => {
          this.grouplist = rep;
        });
    } else {
      this.grouplist = [];
    }
  }

  getprolist(levelid: number) {
    this.data.getcombo(`ComboPro/Getgraduateprogrambylevel/${levelid}`).then((resp: any) => {
        //console.log(resp)
        this.prolist = resp;
    });
  }

  onSearch() {
    this.submit = true;
    //if (this.studentcode) {
      this.submit = false;
      this.getstu();
    // } else {
    //   // this.alert.Showwarning("กรุณากรอกข้อมูล");
    //   this.openformstudentsearch();
    // }
    // this.svalue = showstrwhere;
  }
  getstu() {

      this.loadingVisible = true;
      this.data.get("Prgstudentmaster/Getbystr/" +
            this.util.ntb(this.studentcode) +
            "/" + this.util.ntb(this.studentname) +
            "/" + this.util.ntb(this.studentsurname) +
            "/" + this.util.ntb(this.citizenid) +
            "/" + this.util.ntz(this.studentstatus) +
            "/" + this.util.ntz(this.levelid) +
            "/" + this.util.ntz(this.facultyid) +
            "/" + this.util.ntz(this.departmentid) +
            "/" + this.util.ntz(this.programid) +
            "/" + this.util.ntb(this.groupyear) +
            "/" + this.util.ntb(this.studentgroup)
        ).then((resp: any) => {
          if (resp.length > 0) {
            this.stulist = resp;

            this.loadingVisible = false;
            //console.log(resp[0]?.levelid)
            
          } else {
            this.loadingVisible = false;
            this.alert.Showwarning("ไม่พบข้อมูล");
            this.stulist = [];
          }
        });

  }
  onEditstart(e: any) {
    //this.editmodeopen = true;
    this.getprolist(e.data.levelid);
    if (!this.editmodeopen) {
      this.editmodeopen = true;
    } else {
      // alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
      // e.cancel = true;
    }
  }
  onEditorPreparing(e: any) {
    if(e.parentType == "dataRow" && (e.dataField == "studentpassword" || e.dataField == "parentpassword")){
      e.editorOptions.mode = 'password';
    }
    // if(e.parentType == "dataRow" && e.dataField == "fatherforeignaddress"){
    //   const country = e.row?.data?.fathercountry;
    //   if(country > 1){
    //     e.editorOptions.disabled = true
    //   } else {
    //     e.editorOptions.disabled = false
    //   }
    // }
  }
  onCancelEditmode() {
    this.editmodeopen = false;
  }
  stuSave(data: any) {
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keystudentid = data.changes[0]["key"].studentid
          // delete parameter.motherbirthdate
          //console.log(parameter)
          this.data.put("Prgstudentmaster/Put", parameter).then((resp: any) => {
            this.getstu();
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });

          break;
      }
    } else {
      this.editmodeopen = false;
    }
  }
  setgroupyear(rowData: any, value: any): void {
    rowData.studentgroup = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  getFilteredGroup2(options: any) {
    let studentgroupnumber;
    if (options.data) studentgroupnumber = Number(options.data.studentgroup);
    return {
      store: this.grouplist2,
      filter: options.data
        ? ["comboid", "=", Number(studentgroupnumber)]
        : null,
      paginate: true,
      pageSize: 10,
    };
  }
  updatedatafrom(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  openformstudentsearch() {
    sessionStorage.setItem("prgform", sessionStorage.getItem("sysmenuid"));
    this.routes.navigate(["/15289"]);
  }

  refreshGroupyear() {
      this.studentgroup = null;
      if(this.groupyear){
        this.data.getcombo('ComboStuset/GetBygroupyear/' + this.util.ntz(this.levelid) + '/' + this.util.ntz(this.facultyid) + '/' + this.util.ntz(this.departmentid) + '/' + this.util.ntb(this.groupyear) + '/' + this.util.ntz(this.programid)).then((rep: any) => {
            this.studentgrouplist = rep;
        });
      }
  }

  getdepartment() {
      this.departmentid = null;
      this.data.getcombo('ComboDep/GetbyFac/' + this.util.ntz(this.facultyid) ).then((rep: any) => {
          this.departmentlist = rep;
      });
  }

  getprogram() {
      this.programid = null;

      this.data.getcombo('ComboPro/Getbyfacdeplev/' + this.util.ntz(this.facultyid) + '/'  + this.util.ntz(this.departmentid) + '/'  + this.util.ntz(this.levelid)).then((rep: any) => {
          this.programlist = rep;
      });
  }
  assertThaiId = async (thaiId: any) => {
        const m = thaiId.value.match(/(\d{12})(\d)/)
        if (!m) {
            this.alert.Showwarning('เลขบัตรประจำตัวประชาชนต้องมี 13 หลัก')
            throw new Error('เลขบัตรประจำตัวประชาชนต้องมี 13 หลัก')
        }
        const digits = m[1].split('');
        const sum = digits.reduce((total: number, digit: string, i: number) => {
            return total + (13 - i) * +digit;
        }, 0)
        const lastDigit = `${(11 - sum % 11) % 10}`
        const inputLastDigit = m[2]
        if (lastDigit !== inputLastDigit) {
            this.alert.Showwarning('เลขบัตรประจำตัวประชาชนไม่ถูกต้อง')
            throw new Error('เลขบัตรประจำตัวประชาชนไม่ถูกต้อง')
        }
        return true
    }
    assertPhone = async (phoneNumber: any) => {
        const m = phoneNumber.value.match(/(\d{10})/)
        if (!m) {
            this.alert.Showwarning('หมายเลขโทรศัพท์ต้องมี 10 หลัก')
            throw new Error('หมายเลขโทรศัพท์ต้องมี 10 หลัก')
        }
        return true
    }
}
