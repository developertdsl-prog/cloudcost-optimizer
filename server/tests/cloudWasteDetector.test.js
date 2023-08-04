const cloudWasteDetector = require('../services/cloudWasteDetector');

describe('Cloud Waste Detector', () => {
  test('should detect unattached disks and idle cloud resources', () => {
    const summary = cloudWasteDetector.detectWaste();
    expect(summary).toBeDefined();
    expect(summary.totalMonthlyWasteUsd).toBeGreaterThan(0);
    expect(summary.wasteItemCount).toBeGreaterThanOrEqual(4);
    expect(summary.wasteByType).toHaveProperty('UNATTACHED_DISK');
  });

  test('should remediate a waste item successfully', () => {
    const initialSummary = cloudWasteDetector.detectWaste();
    const targetItem = initialSummary.items[0];

    const remediated = cloudWasteDetector.remediateItem(targetItem.resourceId);
    expect(remediated.resourceId).toBe(targetItem.resourceId);

    const postSummary = cloudWasteDetector.detectWaste();
    expect(postSummary.wasteItemCount).toBe(initialSummary.wasteItemCount - 1);
  });

  test('should throw error when remediating non-existent resource', () => {
    expect(() => {
      cloudWasteDetector.remediateItem('non-existent-vol-999');
    }).toThrow('not found in waste store');
  });
});
