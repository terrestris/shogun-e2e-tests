import {
    expect
} from '@playwright/test';

const myTest = async (page: any) => {
    await expect(page.getByRole('button', {name: 'Kontakt'})).toBeVisible();
};

export default myTest;