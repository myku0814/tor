(function() {
    'use strict';
    // state
    let lv = 0;
    let str = 0;
    let dex = 0;
    let int = 0;
    let agi = 0;
    let vit = 0;
    let crt = 0;
    let men = 0;
    
    // monster
    let lvM = 0;
    let defM = 0;
    let mdefM = 0;
    let phyResistM = 0;
    let magResistM = 0;
    let fleeM = 0;

    // skill
    let skillType = "";
    let skillNearFar ="";
    let skillPtg = 0;
    let skillConst = 0;
    let skillTime = 0;

    let skill1 = 0;
    let skill2 = 0;
    let skill3 = 0;
    let skill4 = 0;
    let skill5 = 0;

    // equip
    let equipSelect = "";
    let weaponRefine = 0;
    let weaponAtk = 0;
    let weaponStab = 0;
    let weapon2Stab = 0;
    let weapon = "";
    let armor = "";
    let addi = "";
    let ring = "";
    
    // needs
    
    let strPtg = 0;
    let dexPtg = 0;
    let intPtg = 0;
    let agiPtg = 0;
    let vitPtg = 0;

    let strConst = 0;
    let dexConst = 0;
    let intConst = 0;
    let agiConst = 0;
    let vitConst = 0;
    
    let wpAtkPtg = 0;
    let wpAtkConst = 0;
    let atkPtg = 0;
    let matkPtg = 0;
    let atkConst = 0;
    let matkConst = 0;

    let cPtg = 0;
    let cdPtg = 0;
    let cConst = 0;
    let cdConst = 0;
    
    let aspdPtg = 0;
    let cspdPtg = 0;
    let aspdConst = 0;
    let cspdConst = 0;

    let elemPtg = 0;
    let nearPtg = 0;
    let farPtg = 0;
    let ktnPtg = 0;
    let stabPtg = 0;
    let phyPPtg = 0;
    let magPPtg = 0;

    let hitPtg = 0;
    let fleePtg = 0;
    let hitConst = 0;
    let fleeConst = 0;

    let aggroPtg = 0;
    
    let hpPtg = 0;
    let hpConst = 0;
    let mpConst = 0;

    // calc use
    let strEq = 0;
    let dexEq = 0;
    let intEq = 0;
    let agiEq = 0;
    let vitEq = 0;

    let baseAtk = 0; //基礎
    let baseMatk = 0;

    let atk = 0; //面板
    let matk = 0;
    let atk2 = 0; //雙劍副手面板(隱藏)

    let atkEq = 0; //有效atk
    let atk2Eq = 0;
    let matkEq = 0;

    let cdEq = 0;
    
    let damage = 0; //傷害(物或魔)

    // base*(1+x%)+x
    function generalCalc(xBase, xPercentage, xConst) {
        return parseInt(xBase*(1+xPercentage/100)+xConst); 
    }

    function strCalc(str, strPtg, strConst) { strEq = generalCalc(str, strPtg, strConst); }
    function dexCalc(dex, dexPtg, dexConst) { dexEq = generalCalc(dex, dexPtg, dexConst); }
    function intCalc(int, intPtg, intConst) { intEq = generalCalc(int, intPtg, intConst); }
    function agiCalc(agi, agiPtg, agiConst) { agiEq = generalCalc(agi, agiPtg, agiConst); }

    // 技能換算
    function skillDecode(lv, skill1, skill2, skill3, skill4, skill5) {
        // skill1
        if(10 >= skill1 && skill1 > 7) {
            wpAtkPtg += skill1*3;
            atkPtg += 3;
        } else if(7 >= skill1 && skill1 > 1) {
            wpAtkPtg += skill1*3;
            atkPtg += 2;
        } else if(skill1 == 1) {
            wpAtkPtg += skill1*3;
            atkPtg +=1;
        } else {
            console.log("no skill1...");
        }

        // skill2
        if(lv == 1 && skill2 ==1) {
            atkConst += parseInt(0.02);
        } else if(10 >= skill2 && skill2 > 0) {
            atkConst += parseInt(0.025 * lv * skill2);
        } else {
            console.log("no skill2...");
        }

        // skill3
        if(10 >= skill3 && skill3 > 0) {
            cConst += 0.5*skill3;
            cdPtg += 0.5*skill3;
        } else {
            console.log("no skill3...");
        }
        
        // skill4
        if(lv == 1 && skill4 ==1) {
            atkConst += parseInt(0.02);
        } else if(10 >= skill4 && skill4 > 0) {
            atkConst += parseInt(0.025 * lv * skill4);
        } else {
            console.log("no skill4...");
        }

        // skill5
        if(10 >= skill5 && skill5 > 0) {
            hitPtg += skill5;
            stabPtg += parseInt(skill5/2);
            cConst += parseInt(skill5/2);
            wpAtkPtg += skill5;
        } else {
            console.log("no skill5...");
        }
    }

    // 基礎atk
    function baseAtkCalc(lv, strEq, dexEq, intEq, agiEq, equipSelect, weaponRefine, weaponAtk, wpAtkPtg, wpAtkConst) {
        const forRefine = weaponAtk*(Math.pow(weaponRefine, 2))/100 + weaponRefine
        const forWeapon = generalCalc(weaponAtk, wpAtkPtg, wpAtkConst);
        let forStat = 0;
        switch(equipSelect) {
            case "bareHand":
                forStat = 1 + strEq;
                break;
            case "ohs":
                forStat = strEq*2 + dexEq*2;
                break;
            case "ths":
                forStat = strEq*3 + dexEq;
                break;
            case "ds":
                forStat = dexEq*2 + strEq + agiEq;
                break;
            case "bow":
                forStat = dexEq*3 + strEq;
                break;
            case "bg":
                forStat = dexEq*4;
                break;
            case "stf":
                forStat = strEq*3 + intEq;
                break;
            case "md":
                forStat = intEq*2 + agiEq*2;
                break;
            case "kk":
                forStat = agiEq*2 + parseInt(dexEq*0.5);
                break;
            case "hb":
                forStat = parseInt(strEq*2.5) + parseInt(agiEq*1.5);
                break;
            case "ktn":
                forStat = parseInt(dexEq*2.5) + parseInt(strEq*1.5);
                break;
            default:
                console.log("no such equipSelect...");
        }
        baseAtk =  lv + forWeapon + forRefine + forStat;
    }
    
    // 基礎matk
    function baseMatkCalc(lv, strEq, dexEq, intEq, agiEq, equipSelect, weaponRefine, weaponAtk, wpAtkPtg, wpAtkConst) {
        const forRefine = weaponAtk*(Math.pow(weaponRefine, 2))/100 + weaponRefine
        const forWeapon = generalCalc(weaponAtk, wpAtkPtg, wpAtkConst);
        let magic= 0;
        switch(equipSelect) {
            case "stf":
                magic = 1;
                break;
            case "md":
                magic = 1;
                break;
            case "kk":
                magic = 0.5;
                break;
            default:
                console.log("除了法杖、魔導具、拳套，其它武器的武器性能是完全不會增加Matk的(By cyteria)");
        }

        let forStat = 0;
        switch(equipSelect) {
            case "bareHand":
                forStat = 1 + intEq + dexEq;
                break;
            case "ohs":
                forStat = intEq*3 + dexEq;
                break;
            case "ths":
                forStat = intEq*3 + dexEq;
                break;
            case "ds":
                forStat = intEq*3 + dexEq;
                break;
            case "bow":
                forStat = intEq*3 + dexEq;
                break;
            case "bg":
                forStat = intEq*3 + dexEq;
                break;
            case "stf":
                forStat = intEq*4 + dexEq;
                break;
            case "md":
                forStat = intEq*4 + dexEq;
                break;
            case "kk":
                forStat = intEq*4 + dexEq;
                break;
            case "hb":
                forStat = intEq*2 + dexEq + agiEq;
                break;
            case "ktn":
                forStat = parseInt(intEq*1.5) + dexEq;
                break;
            default:
                console.log("no such equipSelect...");
        }
        baseMatk = lv + (forWeapon + forRefine)*magic + forStat;
    }

    // 雙見的副手atk*副手倍率
    function baseAtk2(agiEq, strEq, weapon2Stab, stabPtg) {
        const x =  parseInt(weapon2Stab/2) + stabPtg + parseInt(strEq*0.06) + parseInt(agiEq*0.04);
        const forStat2 = agiEq*3 + strEq;
        atk2 = parseInt(forStat2 * x/100);
    }

    // 面板atk
    function atkCalc(baseAtk, atkPtg, atkConst) {
        atk = generalCalc(baseAtk, atkPtg, atkConst);
    }
    
    // 面板matk
    function matkCalc(baseMatk, matkPtg, matkConst) {
        matk = generalCalc(baseMatk, matkPtg, matkConst);
    }
    
    // 有效atk
    function atkEqCalc(atk, lv, lvM, defM, phyPPtg) {
        atkEq = atk + (lv - lvM) - parseInt(defM*(100-phyPPtg)/100);
    }
    
    // 有效matk
    function matkEqCalc(matk, lv, lvM, mdefM, magPPtg) {
        matkEq = matk + (lv - lvM) - parseInt(mdefM*(100-magPPtg)/100);
    }
    
    // 有效雙劍atk
    function DSatkEqCalc(atk, atk2, lv, lvM, defM, phyPPtg) {
        atk2Eq = atk + atk2 + (lv - lvM) - parseInt(defM*(100-phyPPtg)/100);
    }

    // 爆傷計算
    function cdClac(strEq, cdPtg, cdConst) {
        const baseCd = parseInt(150 + strEq/5.1);
        cdEq = generalCalc(baseCd, cdPtg, cdConst);
    }

    // 加上技能後的物魔傷害
    function damageCalc(equipSelect, skillType, skillNearFar, skillPtg, skillConst, atkEq, atk2Eq, matkEq, cdEq, elemPtg, nearPtg, farPtg, ktnPtg, stabPtg, weaponStab, phyResistM, magResistM) {
        const tmp1 = (skillPtg/100) *(1 + cdEq/100)* (1 + elemPtg/100) * (1 + ktnPtg/100);
        const tmp2 = (stabPtg + weaponStab) > 100 ? 1 : 1-(100 - (stabPtg + weaponStab))/200;
        const tmp3 = skillType == "mag" ? 1-magResistM/100 : 1-phyResistM/100;
        let tmp4 = 0;
        if(skillNearFar == "noNearFar") { tmp4 = 1 }
        else { tmp4 = skillNearFar == "far" ? 1 + farPtg/100 : 1 + nearPtg/100; }

        if(equipSelect == "ds") {
            damage = (atk2Eq + skillConst)*tmp1*tmp2*tmp3*tmp4;
        } else if(skillType == "phy") {
            damage = (atkEq + skillConst)*tmp1*tmp2*tmp3*tmp4;
        } else if(skillType == "mag") {
            damage = (matkEq + skillConst)*tmp1*tmp2*tmp3*tmp4;
        } else if(skillType == "nor") {
            damage = atkEq *tmp1*tmp2*tmp3*tmp4 / (skillPtg/100);
        } else {
            console.log("什麼skillType情況..")
        }
    }
    

    // extract
    function extract(abliString) {
        if(abliString.indexOf('/$') != abliString.length-2 || abliString.length < 2) { console.log("no extract..."); return;}

        const splitArr = String(abliString).split('/');
        splitArr.forEach((el) => {
            let nonNegArr = "";
            let nonPerArr = "";
            let negFlag = false;
            let perFlag = false;
            let catFlag = "none";
            let tmp = "";
            
            if(el == "$") {console.log("dont need extract $"); return;}

            // negative or not
            if(el[0] == "-") {
                negFlag = true;
                nonNegArr = el.substring(1);
            } else {
                nonNegArr = el.substring(0);
            }
            
            // % or not
            if(nonNegArr.indexOf("%") != -1) {
                perFlag = true;
                nonPerArr = nonNegArr.substring(0, nonNegArr.length-1);
            } else {
                nonPerArr = nonNegArr;
            }
            
            // define tmp
            // if(nonPerArr.indexOf("s") != -1) {
            //     catFlag = "s";
            //     tmp = nonPerArr.substring(1);
            // } else if(nonPerArr.indexOf("d") != -1) {
            //     catFlag = "d";
            //     tmp = nonPerArr.substring(1);
            // } else if(nonPerArr.indexOf("i") != -1) {
            //     catFlag = "i";
            //     tmp = nonPerArr.substring(1);
            // } else if(nonPerArr.indexOf("a") != -1) {
            //     catFlag = "a";
            //     tmp = nonPerArr.substring(1);
            // } else if(nonPerArr.indexOf("v") != -1) {
            //     catFlag = "v";
            //     tmp = nonPerArr.substring(1);
            // } else if(nonPerArr.indexOf("wpa") != -1) {
            //     catFlag = "wpa";
            //     tmp = nonPerArr.substring(3);
            // } else if(nonPerArr.indexOf("atk") != -1) {
            //     catFlag = "atk";
            //     tmp = nonPerArr.substring(3);
            // } else if(nonPerArr.indexOf("matk") != -1) {
            //     catFlag = "matk";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("c") != -1) {
            //     catFlag = "c";
            //     tmp = nonPerArr.substring(1);
            // } else if(nonPerArr.indexOf("cd") != -1) {
            //     catFlag = "cd";
            //     tmp = nonPerArr.substring(2);
            // } else if(nonPerArr.indexOf("aspd") != -1) {
            //     catFlag = "aspd";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("cspd") != -1) {
            //     catFlag = "cspd";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("elem") != -1) {
            //     catFlag = "elem";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("near") != -1) {
            //     catFlag = "near";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("far") != -1) {
            //     catFlag = "far";
            //     tmp = nonPerArr.substring(3);
            // } else if(nonPerArr.indexOf("ktn") != -1) {
            //     catFlag = "ktn";
            //     tmp = nonPerArr.substring(3);
            // } else if(nonPerArr.indexOf("stab") != -1) {
            //     catFlag = "stab";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("phyp") != -1) {
            //     catFlag = "phyp";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("magp") != -1) {
            //     catFlag = "magp";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("hit") != -1) {
            //     catFlag = "hit";
            //     tmp = nonPerArr.substring(3);
            // } else if(nonPerArr.indexOf("flee") != -1) {
            //     catFlag = "flee";
            //     tmp = nonPerArr.substring(4);
            // } else if(nonPerArr.indexOf("aggro") != -1) {
            //     catFlag = "aggro";
            //     tmp = nonPerArr.substring(5);
            // } else if(nonPerArr.indexOf("hp") != -1) {
            //     catFlag = "hp";
            //     tmp = nonPerArr.substring(2);
            // } else if(nonPerArr.indexOf("mp") != -1) {
            //     catFlag = "mp";
            //     tmp = nonPerArr.substring(2);
            // } else {
            //     console.log("extract wrong...")
            // }

            // 小心順序
            if(nonPerArr.indexOf("aggro") != -1) {
                catFlag = "aggro";
                tmp = nonPerArr.substring(5);
            } else if(nonPerArr.indexOf("aspd") != -1) {
                catFlag = "aspd";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("cspd") != -1) {
                catFlag = "cspd";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("elem") != -1) {
                catFlag = "elem";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("near") != -1) {
                catFlag = "near";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("stab") != -1) {
                catFlag = "stab";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("phyp") != -1) {
                catFlag = "phyp";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("magp") != -1) {
                catFlag = "magp";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("flee") != -1) {
                catFlag = "flee";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("matk") != -1) {
                catFlag = "matk";
                tmp = nonPerArr.substring(4);
            } else if(nonPerArr.indexOf("wpa") != -1) {
                catFlag = "wpa";
                tmp = nonPerArr.substring(3);
            } else if(nonPerArr.indexOf("atk") != -1) {
                catFlag = "atk";
                tmp = nonPerArr.substring(3);
            } else if(nonPerArr.indexOf("far") != -1) {
                catFlag = "far";
                tmp = nonPerArr.substring(3);
            } else if(nonPerArr.indexOf("ktn") != -1) {
                catFlag = "ktn";
                tmp = nonPerArr.substring(3);
            } else if(nonPerArr.indexOf("hit") != -1) {
                catFlag = "hit";
                tmp = nonPerArr.substring(3);
            } else if(nonPerArr.indexOf("hp") != -1) {
                catFlag = "hp";
                tmp = nonPerArr.substring(2);
            } else if(nonPerArr.indexOf("mp") != -1) {
                catFlag = "mp";
                tmp = nonPerArr.substring(2);

            } else if(nonPerArr.indexOf("cd") != -1) {
                catFlag = "cd";
                tmp = nonPerArr.substring(2);
            } else if(nonPerArr.indexOf("c") != -1) {
                catFlag = "c";
                tmp = nonPerArr.substring(1);
            } else if(nonPerArr.indexOf("s") != -1) {
                catFlag = "s";
                tmp = nonPerArr.substring(1);
            } else if(nonPerArr.indexOf("d") != -1) {
                catFlag = "d";
                tmp = nonPerArr.substring(1);
            } else if(nonPerArr.indexOf("i") != -1) {
                catFlag = "i";
                tmp = nonPerArr.substring(1);
            } else if(nonPerArr.indexOf("a") != -1) {
                catFlag = "a";
                tmp = nonPerArr.substring(1);
            } else if(nonPerArr.indexOf("v") != -1) {
                catFlag = "v";
                tmp = nonPerArr.substring(1);
            } else {
                console.log("extract wrong...")
            }

            // ctrl unit
            if(negFlag) {
                tmp = `-${tmp}`
            }

            console.log(tmp);
            tmp = parseInt(tmp, 10);

            switch(catFlag) {
                case "s":
                    perFlag == false ? strConst += tmp : strPtg += tmp;
                    break;
                case "d":
                    perFlag == false ? dexConst += tmp : dexPtg += tmp;
                    break;
                case "i":  
                    perFlag == false ? intConst += tmp : intPtg += tmp;
                    break;     
                case "a":
                    perFlag == false ? agiConst += tmp : agiPtg += tmp;
                    break;
                case "v":
                    perFlag == false ? vitConst += tmp : vitPtg += tmp;
                    break;
                case "wpa":
                    perFlag == false ? wpAtkConst += tmp : wpAtkPtg += tmp;
                    break;
                case "atk":
                    perFlag == false ? atkConst += tmp : atkPtg += tmp;
                    break;
                case "matk":
                    perFlag == false ? matkConst += tmp : matkPtg += tmp;
                    break;
                case "c":
                    perFlag == false ? cConst += tmp : cPtg += tmp;
                    break;
                case "cd":
                    perFlag == false ? cdConst += tmp : cdPtg += tmp;
                    break;
                case "aspd":
                    perFlag == false ? aspdConst += tmp : aspdPtg += tmp;
                    break;
                case "cspd":
                    perFlag == false ? cspdConst += tmp : cspdPtg += tmp;
                    break;
                case "elem":
                    if(perFlag != false) { elemPtg += tmp; }
                    else { console.log("elem no const..."); }
                    break;
                case "near":
                    if(perFlag != false) { nearPtg += tmp; }
                    else { console.log("near no const..."); }
                    break;
                case "far":
                    if(perFlag != false) { farPtg += tmp; }
                    else { console.log("far no const..."); }
                    break;
                case "ktn":
                    if(perFlag != false) { ktnPtg += tmp; }
                    else { console.log("ktn no const..."); }
                    break;
                case "stab":
                    if(perFlag != false) { stabPtg += tmp; }
                    else { console.log("stab no const..."); }
                    break;
                case "phyp":
                    if(perFlag != false) { phyPPtg += tmp; }
                    else { console.log("phyp no const..."); }
                    break;
                case "magp":
                    if(perFlag != false) { magPPtg += tmp; }
                    else { console.log("magp no const..."); }
                    break;
                case "hit":
                    perFlag == false ? hitConst += tmp : hitPtg += tmp;
                    break;
                case "flee":
                    perFlag == false ? fleeConst += tmp : fleePtg += tmp;
                    break;
                case "aggro":
                    if(perFlag != false) { aggroPtg += tmp; }
                    else { console.log("aggro no const..."); }
                    break;
                case "hp":
                    perFlag == false ? hpConst += tmp : hpPtg += tmp;
                    break;
                case "mp":
                    if(perFlag == false) { mpConst += tmp; }
                    else { console.log("mp no percentage"); }
                    break;
                default:
                    console.log("no such catFlag...")
            }

        });
    }
    
    function doSomething() {
        color();
    }

    document.getElementById('input').addEventListener('input', function(e) {
        switch(e.target.className) {
            case "stat":
                switch(e.target.id) {
                    case "lv":
                        lv = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "str":
                        str = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "dex":
                        dex = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "int":
                        int = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "agi":
                        agi = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "vit":
                        vit = parseInt(e.target.value, 10);
                        break;
                    case "crt":
                        crt = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "men":
                        men = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    default:
                        console.log("no matched id...");
                }
                break;
            case "monster":
                switch(e.target.id) {
                    case "lvM":
                        lvM = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "defM":
                        defM = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "mdefM":
                        mdefM = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "phyResistM":
                        phyResistM = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "magResistM":
                        magResistM = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "fleeM":
                        fleeM = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    default:
                        console.log("no matched id...");
                }
                break;
            case "skill":
                switch(e.target.id) {
                    case "skillType":
                        skillType = String(e.target.value);
                        doSomething();
                        break;
                    case "skillNearFar":
                        skillNearFar = String(e.target.value);
                        doSomething();
                        break;
                    case "skillTime":
                        skillTime = parseFloat(e.target.value, 10).toFixed(3);
                        doSomething();
                        break;
                    case "skillPtg":
                        skillPtg = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "skillConst":
                        skillConst = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "skill1":
                        skill1 = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "skill2":
                        skill2 = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "skill3":
                        skill3 = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "skill4":
                        skill4 = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "skill5":
                        skill5 = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    default:
                        console.log("no matched id...");
                }
                break;
            case "equip":
                switch(e.target.id) {
                    case "equipSelect":
                        equipSelect = String(e.target.value);
                        doSomething();
                        break;
                    case "weaponRefine":
                        weaponRefine = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "weaponAtk":
                        weaponAtk = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "weaponStab":
                        weaponStab = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "weapon2Stab":
                        weapon2Stab = parseInt(e.target.value, 10);
                        doSomething();
                        break;
                    case "weapon":
                        weapon = String(e.target.value);
                        extract(weapon);
                        doSomething();
                        break;
                    case "armor":
                        armor = String(e.target.value);
                        extract(armor);
                        doSomething();
                        break;
                    case "addi":
                        addi = String(e.target.value);
                        extract(addi);
                        doSomething();
                        break;
                    case "ring":
                        extract(ring);
                        ring = String(e.target.value);
                        doSomething();
                        break;
                    default:
                        console.log("no matched id...");
                }
                break;
            default:
                console.log("no matched class...");
        }
    })

    function run() {
        strCalc(str, strPtg, strConst);
        dexCalc(dex, dexPtg, dexConst);
        intCalc(int, intPtg, intConst);
        agiCalc(agi, agiPtg, agiConst);
        skillDecode(lv, skill1, skill2, skill3, skill4, skill5);
        baseAtkCalc(lv, strEq, dexEq, intEq, agiEq, equipSelect, weaponRefine, weaponAtk, wpAtkPtg, wpAtkConst);
        baseMatkCalc(lv, strEq, dexEq, intEq, agiEq, equipSelect, weaponRefine, weaponAtk, wpAtkPtg, wpAtkConst);
        baseAtk2(agiEq, strEq, weapon2Stab, stabPtg);
        atkCalc(baseAtk, atkPtg, atkConst);
        matkCalc(baseMatk, matkPtg, matkConst);
        atkEqCalc(atk, lv, lvM, defM, phyPPtg);
        matkEqCalc(matk, lv, lvM, mdefM, magPPtg);
        DSatkEqCalc(atk, atk2, lv, lvM, defM, phyPPtg);
        cdClac(strEq, cdPtg, cdConst);
        damageCalc(equipSelect, skillType, skillNearFar, skillPtg, skillConst, atkEq, atk2Eq, matkEq, cdEq, elemPtg, nearPtg, farPtg, ktnPtg, stabPtg, weaponStab, phyResistM, magResistM);
    }

    function color() {
        lv == 0 ?  document.getElementById('lv').style.color = "red" : document.getElementById('lv').style.color = "green";
        str == 0 ? document.getElementById('str').style.color = "red" : document.getElementById('str').style.color = "green";
        dex == 0 ? document.getElementById('dex').style.color = "red" : document.getElementById('dex').style.color = "green";
        int == 0 ? document.getElementById('int').style.color = "red" : document.getElementById('int').style.color = "green";
        agi == 0 ? document.getElementById('agi').style.color = "red" : document.getElementById('agi').style.color = "green";
        vit == 0 ? document.getElementById('vit').style.color = "red" : document.getElementById('vit').style.color = "green";
        crt == 0 ? document.getElementById('crt').style.color = "red" : document.getElementById('crt').style.color = "green";
        men == 0 ? document.getElementById('men').style.color = "red" : document.getElementById('men').style.color = "green";
         
        lvM == 0 ? document.getElementById('lvM').style.color = "red" : document.getElementById('lvM').style.color = "green";
        defM == 0 ? document.getElementById('defM').style.color = "red" : document.getElementById('defM').style.color = "green";
        mdefM == 0 ? document.getElementById('mdefM').style.color = "red" : document.getElementById('mdefM').style.color = "green";
        phyResistM == 0 ? document.getElementById('phyResistM').style.color = "red" : document.getElementById('phyResistM').style.color = "green";
        magResistM == 0 ? document.getElementById('magResistM').style.color = "red" : document.getElementById('magResistM').style.color = "green";
        fleeM == 0 ? document.getElementById('fleeM').style.color = "red" : document.getElementById('fleeM').style.color = "green";
     
        skillType == "" ? document.getElementById('skillType').style.color = "red" : document.getElementById('skillType').style.color = "green";
        skillNearFar =="" ? document.getElementById('skillNearFar').style.color = "red" : document.getElementById('skillNearFar').style.color = "green";
        skillPtg == 0 ? document.getElementById('skillPtg').style.color = "red" : document.getElementById('skillPtg').style.color = "green";
        skillConst == 0 ? document.getElementById('skillConst').style.color = "red" : document.getElementById('skillConst').style.color = "green";
        skillTime == 0 ? document.getElementById('skillTime').style.color = "red" : document.getElementById('skillTime').style.color = "green";
     
        skill1 == 0 ? document.getElementById('skill1').style.color = "red" : document.getElementById('skill1').style.color = "green";
        skill2 == 0 ? document.getElementById('skill2').style.color = "red" : document.getElementById('skill2').style.color = "green";
        skill3 == 0 ? document.getElementById('skill3').style.color = "red" : document.getElementById('skill3').style.color = "green";
        skill4 == 0 ? document.getElementById('skill4').style.color = "red" : document.getElementById('skill4').style.color = "green";
        skill5 == 0 ? document.getElementById('skill5').style.color = "red" : document.getElementById('skill5').style.color = "green";
     
        equipSelect == "" ? document.getElementById('equipSelect').style.color = "red" : document.getElementById('equipSelect').style.color = "green";
        weaponRefine == 0 ? document.getElementById('weaponRefine').style.color = "red" : document.getElementById('weaponRefine').style.color = "green";
        weaponAtk == 0 ? document.getElementById('weaponAtk').style.color = "red" : document.getElementById('weaponAtk').style.color = "green";
        weaponStab == 0 ? document.getElementById('weaponStab').style.color = "red" : document.getElementById('weaponStab').style.color = "green";
        weapon2Stab == 0 ? document.getElementById('weapon2Stab').style.color = "red" : document.getElementById('weapon2Stab').style.color = "green";
        weapon == "" ? document.getElementById('weapon').style.color = "red" : document.getElementById('weapon').style.color = "green";
        armor == "" ? document.getElementById('armor').style.color = "red" : document.getElementById('armor').style.color = "green";
        addi == "" ? document.getElementById('addi').style.color = "red" : document.getElementById('addi').style.color = "green";
        ring == "" ? document.getElementById('ring').style.color = "red" : document.getElementById('ring').style.color = "green";
    }

    function restart() {
        lv = 0;str = 0;dex = 0;int = 0;agi = 0;vit = 0;crt = 0;men = 0;
        lvM = 0;defM = 0;mdefM = 0;phyResistM = 0;magResistM = 0;fleeM = 0;
        skillType = "";skillNearFar ="";skillPtg = 0;skillConst = 0;skillTime = 0;skill1 = 0;skill2 = 0;skill3 = 0;skill4 = 0;skill5 = 0;
        equipSelect = "";weaponRefine = 0;weaponAtk = 0;weaponStab = 0;weapon2Stab = 0;weapon = "";armor = "";addi = "";ring = "";
        strPtg = 0;dexPtg = 0;intPtg = 0;agiPtg = 0;vitPtg = 0;strConst = 0;dexConst = 0;intConst = 0;agiConst = 0;vitConst = 0;
        wpAtkPtg = 0;wpAtkConst = 0;atkPtg = 0;matkPtg = 0;atkConst = 0;matkConst = 0;cPtg = 0;cdPtg = 0;cConst = 0;cdConst = 0
        aspdPtg = 0;cspdPtg = 0;aspdConst = 0;cspdConst = 0;elemPtg = 0;nearPtg = 0;farPtg = 0;ktnPtg = 0;stabPtg = 0;phyPPtg = 0;magPPtg = 0;
        hitPtg = 0;fleePtg = 0;hitConst = 0;fleeConst = 0;aggroPtg = 0;  hpPtg = 0;hpConst = 0;mpConst = 0;
        strEq = 0;dexEq = 0;intEq = 0;agiEq = 0;vitEq = 0;baseAtk = 0;baseMatk = 0;atk = 0;matk = 0;atk2 = 0;atkEq = 0;atk2Eq = 0;matkEq = 0;cdEq = 0;
        damage = 0;
    }
    
    function debug() {
        document.getElementById('dg').innerHTML = 
        `lv: ${lv} | str: ${str} | dex: ${dex} | int: ${int} | agi: ${agi} | vit: ${vit} | crt: ${crt} | men: ${men}<br><br>
        lvM: ${lvM} | defM: ${defM} | mdefM: ${mdefM} | phyResistM: ${phyResistM} | magResistM: ${magResistM} | fleeM: ${fleeM}<br><br>
        skillType: ${skillType} | skillNearFar: ${skillNearFar} | skillPtg: ${skillPtg} | skillConst: ${skillConst} | skillTime: ${skillTime}<br><br>
        skill1: ${skill1} | skill2: ${skill2} | skill3: ${skill3} | skill4: ${skill4} | skill5: ${skill5}<br><br>
        equipSelect: ${equipSelect} | weaponRefine: ${weaponRefine} | weaponAtk: ${weaponAtk} | weaponStab: ${weaponStab} | weapon2Stab: ${weapon2Stab} |<br><br>
        weapon: ${weapon} | armor: ${armor} | addi: ${addi} | ring: ${ring}<br><br>
        strPtg: ${strPtg} | dexPtg: ${dexPtg} | intPtg: ${intPtg} | agiPtg: ${agiPtg} | vitPtg: ${vitPtg} | strConst: ${strConst} | dexConst: ${dexConst} | intConst: ${intConst} | agiConst: ${agiConst} | vitConst: ${vitConst}<br><br>
        wpAtkPtg: ${wpAtkPtg} | wpAtkConst: ${wpAtkConst} | atkPtg: ${atkPtg} | matkPtg: ${matkPtg} | atkConst: ${atkConst} | matkConst: ${matkConst} <br><br>
        cPtg: ${cPtg} | cdPtg: ${cdPtg} | cConst: ${cConst} | cdConst: ${cdConst}<br><br>
        aspdPtg: ${aspdPtg} | cspdPtg: ${cspdPtg} | aspdConst: ${aspdConst} | cspdConst: ${cspdConst}<br><br>
        elemPtg: ${elemPtg} | nearPtg: ${nearPtg} | farPtg: ${farPtg} | ktnPtg: ${ktnPtg} | stabPtg: ${stabPtg} | phyPPtg: ${phyPPtg} | magPPtg: ${magPPtg}<br><br>
        hitPtg: ${hitPtg} | fleePtg: ${fleePtg} | hitConst: ${hitConst} | fleeConst: ${fleeConst} | aggroPtg: ${aggroPtg} | hpPtg: ${hpPtg} | hpConst: ${hpConst} | mpConst: ${mpConst}<br><br>
        strEq: ${strEq} | dexEq: ${dexEq} | intEq: ${intEq} | agiEq: ${agiEq} | vitEq: ${vitEq} | baseAtk: ${baseAtk} | baseMatk: ${baseMatk} | atk: ${atk} | matk: ${matk} | atk2: ${atk2} | atkEq: ${atkEq} | atk2Eq: ${atk2Eq} | matkEq: ${matkEq} | cdEq: ${cdEq}<br><br>
        damage: ${damage};`;
    }

    document.getElementById('run').addEventListener('click', function(e) {
        run();
        debug();
        console.log("run...");
    });

    document.getElementById('restart').addEventListener('click', function(e) {
        restart();
        color();
        debug();
        console.log("restart...");
    });
}) ()
