// מאזין אירוע לכל שדה קלט כדי לבצע חישובים בזמן אמת
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateResults);
});

// פונקציה לסנכרון ערכי הנכס בין המינופים השונים
function synchronizePropertyValues() {
    const propertyValue75 = parseFloat(document.getElementById('property-value-75').value) || 0;
    document.getElementById('property-value-60').value = propertyValue75;
    document.getElementById('property-value-40').value = propertyValue75;
}

// פונקציה לקבלת ערך קלט עם וולידציה
function getInputValue(id) {
    const input = document.getElementById(id);
    if (!input) {
        console.error(`Element with id '${id}' not found.`);
        return 0;
    }
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0) {
        input.classList.add('input-error');
        return 0;
    } else {
        input.classList.remove('input-error');
        return value;
    }
}

// פונקציה לחישוב התוצאות
function calculateResults() {
    // סנכרון ערכי הנכס
    synchronizePropertyValues();

    // Block 1: חישוב סה"כ הכנסה משפחתית
    const salary1Partner = getInputValue('salary1-partner'); // בן זוג
    const salary1Spouse = getInputValue('salary1-spouse');   // בת זוג
    const salary2Partner = getInputValue('salary2-partner');
    const salary2Spouse = getInputValue('salary2-spouse');
    const businessIncomePartner = getInputValue('business-income-partner');
    const businessIncomeSpouse = getInputValue('business-income-spouse');
    const rentalIncomePartner = getInputValue('rental-income-partner');
    const rentalIncomeSpouse = getInputValue('rental-income-spouse');
    const disabilityAllowancePartner = getInputValue('disability-allowance-partner');
    const disabilityAllowanceSpouse = getInputValue('disability-allowance-spouse');
    const alimonyPartner = getInputValue('alimony-partner');
    const alimonySpouse = getInputValue('alimony-spouse');
    const deductionAlimonyPartner = getInputValue('deduction-alimony-partner');
    const deductionAlimonySpouse = getInputValue('deduction-alimony-spouse');

    // סה"כ הכנסות בן זוג
    const totalIncomePartner = salary1Partner + salary2Partner + businessIncomePartner + rentalIncomePartner + disabilityAllowancePartner + alimonyPartner - deductionAlimonyPartner;
    document.getElementById('total-income-partner').textContent = `₪${totalIncomePartner.toLocaleString()}`;

    // סה"כ הכנסות בת זוג
    const totalIncomeSpouse = salary1Spouse + salary2Spouse + businessIncomeSpouse + rentalIncomeSpouse + disabilityAllowanceSpouse + alimonySpouse - deductionAlimonySpouse;
    document.getElementById('total-income-spouse').textContent = `₪${totalIncomeSpouse.toLocaleString()}`;

    // סה"כ הכנסה משפחתית
    const totalIncome = totalIncomePartner + totalIncomeSpouse;
    document.getElementById('total-income').textContent = `₪${totalIncome.toLocaleString()}`;

    // סכום פנוי למשכנתא
    const availableMortgage = totalIncome * 0.33;
    document.getElementById('available-mortgage').textContent = `₪${availableMortgage.toLocaleString()}`;

    // Block 2: חישוב הלוואות
    const loanBalance1 = getInputValue('loan1');
    const loanBalance2 = getInputValue('loan2');
    const loanBalance3 = getInputValue('loan3');
    const loanBalance4 = getInputValue('loan4');
    const loanBalance5 = getInputValue('loan5');
    const loanBalance6 = getInputValue('loan6');
    const totalLoans = loanBalance1 + loanBalance2 + loanBalance3 + loanBalance4 + loanBalance5 + loanBalance6;
    document.getElementById('total-loans').textContent = `₪${totalLoans.toLocaleString()}`;

    const monthlyPayment1 = getInputValue('loan1-monthly');
    const monthlyPayment2 = getInputValue('loan2-monthly');
    const monthlyPayment3 = getInputValue('loan3-monthly');
    const monthlyPayment4 = getInputValue('loan4-monthly');
    const monthlyPayment5 = getInputValue('loan5-monthly');
    const monthlyPayment6 = getInputValue('loan6-monthly');
    const totalMonthlyPayment = monthlyPayment1 + monthlyPayment2 + monthlyPayment3 + monthlyPayment4 + monthlyPayment5 + monthlyPayment6;
    document.getElementById('total-monthly-payment').textContent = `₪${totalMonthlyPayment.toLocaleString()}`;

    // סכום פנוי למשכנתא לאחר החזר הלוואות
    const availableMortgageAfterLoans = availableMortgage - totalMonthlyPayment;
    document.getElementById('available-mortgage-after-loans').textContent = `₪${availableMortgageAfterLoans.toLocaleString()}`;

    // חישוב משכנתא מאושרת
    const mortgageWithoutLoans = (availableMortgage / 550) * 100000;
    document.getElementById('approved-amount-without-loans').textContent = `₪${mortgageWithoutLoans.toLocaleString()}`;

    const mortgageWithLoans = (availableMortgageAfterLoans / 550) * 100000;
    document.getElementById('approved-amount-with-loans').textContent = `₪${mortgageWithLoans.toLocaleString()}`;

    // Block 3: חישוב הון אישי ותשלומים
    const personalCapital = getInputValue('personal-capital');
    const lockedCapitalLoan = getInputValue('locked-capital-loan');
    const governmentLoan = getInputValue('government-loan');
    const financialPlatformsCapital = getInputValue('financial-platforms-capital');
    const otherCapital1 = getInputValue('other-capital-1');
    const otherCapital2 = getInputValue('other-capital-2');

    // סה"כ הון אישי מצטבר
    const totalCapital = personalCapital + lockedCapitalLoan + governmentLoan + financialPlatformsCapital + otherCapital1 + otherCapital2;
    document.getElementById('total-capital').textContent = `₪${totalCapital.toLocaleString()}`;

    // חישוב הוצאות
    const operationalExpenses = getInputValue('operational-expenses');
    const taxExpenses = getInputValue('tax-expenses');
    const enhancementExpenses = getInputValue('enhancement-expenses');
    const totalExpenses = operationalExpenses + taxExpenses + enhancementExpenses;
    document.getElementById('total-expenses').textContent = `₪${totalExpenses.toLocaleString()}`;

    // הון עצמי נטו
    const netCapital = totalCapital - totalExpenses;
    document.getElementById('net-capital').textContent = `₪${netCapital.toLocaleString()}`;

    // משכנתא מאושרת על פי הון עצמי
    const approvedMortgageFirstHome = netCapital * 4;
    document.getElementById('approved-mortgage-first-home').textContent = `₪${approvedMortgageFirstHome.toLocaleString()}`;

    const approvedMortgageSecondHome = netCapital * 2;
    document.getElementById('approved-mortgage-second-home').textContent = `₪${approvedMortgageSecondHome.toLocaleString()}`;

    // סכום משכנתא
    const mortgageAmountFirstHome = approvedMortgageFirstHome - netCapital;
    const mortgageAmountSecondHome = approvedMortgageSecondHome - netCapital;

    // סך תקציב לביצוע השקעה
    const totalBudgetFirstHome = mortgageAmountFirstHome + netCapital;
    document.getElementById('total-budget-first-home').textContent = `₪${totalBudgetFirstHome.toLocaleString()}`;

    const totalBudgetSecondHome = mortgageAmountSecondHome + netCapital;
    document.getElementById('total-budget-second-home').textContent = `₪${totalBudgetSecondHome.toLocaleString()}`;

    // סך תקציב לביצוע השקעה על פי פרמטר יכולת החזר
    const totalBudgetWithoutLoans = mortgageWithoutLoans + totalCapital;
    document.getElementById('mortgage-and-capital-without-loans').textContent = `₪${totalBudgetWithoutLoans.toLocaleString()}`;

    const totalBudgetWithLoans = mortgageWithLoans + totalCapital;
    document.getElementById('mortgage-and-capital-with-loans').textContent = `₪${totalBudgetWithLoans.toLocaleString()}`;

    // חישוב מינוף
    calculateLeverage('75');
    calculateLeverage('60');
    calculateLeverage('40');

    // עדכון תוצאות סופיות
    document.getElementById('final-total-income').textContent = `₪${totalIncome.toLocaleString()}`;
    document.getElementById('final-total-loans').textContent = `₪${totalLoans.toLocaleString()}`;
    document.getElementById('final-total-monthly-loan-payment').textContent = `₪${totalMonthlyPayment.toLocaleString()}`;
    // הצגת הון עצמי נטו במקום סה"כ הון אישי מצטבר
    document.getElementById('final-total-capital-and-costs').textContent = `₪${netCapital.toLocaleString()}`;
}

// פונקציה לחישוב מינוף
function calculateLeverage(idSuffix) {
    const leverage = parseFloat(idSuffix) / 100;
    const propertyValue = getInputValue(`property-value-${idSuffix}`);
    const equity = propertyValue * (1 - leverage);
    const mortgage = propertyValue * leverage;
    const monthlyMortgagePayment = (mortgage / 100000) * 550; // הנחה: 550 תשלומים
    document.getElementById(`equity-${idSuffix}`).textContent = `₪${equity.toLocaleString()}`;
    document.getElementById(`mortgage-${idSuffix}`).textContent = `₪${mortgage.toLocaleString()}`;
    document.getElementById(`monthly-mortgage-payment-${idSuffix}`).textContent = `₪${monthlyMortgagePayment.toLocaleString()}`;
}

// פונקציה לאיפוס המחשבון
function resetCalculator() {
    // איפוס כל שדות הקלט
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
        input.classList.remove('input-error');
    });
    // איפוס כל התוצאות
    document.querySelectorAll('span[id]').forEach(span => {
        span.textContent = '₪';
    });
    document.querySelectorAll('td[id]').forEach(td => {
        td.textContent = '₪';
    });
}

// קריאה ראשונית לפונקציית החישוב
calculateResults();
