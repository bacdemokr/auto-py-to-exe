// Build a dependency-free CommonJS function summarizing GPU temperature and disk usage.
// PM → Dev. 2026-10-19T00:06:36.578Z

// Usage: const summarizeSystemMetrics = require('./system-metrics-summary');
'use strict';

function summarizeSystemMetrics(gpuTemp, diskUsed, diskTotal) {
  if (!Number.isFinite(gpuTemp)) {
    return { ok: false, error: 'gpuTemp must be a finite number.' };
  }

  if (!Number.isFinite(diskUsed)) {
    return { ok: false, error: 'diskUsed must be a finite number.' };
  }

  if (!Number.isFinite(diskTotal)) {
    return { ok: false, error: 'diskTotal must be a finite number.' };
  }

  if (gpuTemp < 0) {
    return { ok: false, error: 'gpuTemp cannot be negative.' };
  }

  if (diskUsed < 0) {
    return { ok: false, error: 'diskUsed cannot be negative.' };
  }

  if (diskTotal <= 0) {
    return { ok: false, error: 'diskTotal must be greater than zero.' };
  }

  if (diskUsed > diskTotal) {
    return { ok: false, error: 'diskUsed cannot exceed diskTotal.' };
  }

  var gpuStatus = gpuTemp >= 85 ? 'critical' : gpuTemp >= 70 ? 'warm' : 'normal';
  var diskPercentage = Number(((diskUsed / diskTotal) * 100).toFixed(2));
  var diskStatus = diskPercentage >= 90 ? 'full' : diskPercentage >= 80 ? 'warning' : 'healthy';

  var overallStatus = 'healthy';
  if (gpuStatus === 'critical' || diskStatus === 'full') {
    overallStatus = 'critical';
  } else if (gpuStatus === 'warm' || diskStatus === 'warning') {
    overallStatus = 'warning';
  }

  return {
    ok: true,
    gpu: {
      temperature: gpuTemp,
      status: gpuStatus
    },
    disk: {
      used: diskUsed,
      total: diskTotal,
      percentage: diskPercentage,
      status: diskStatus
    },
    overallStatus: overallStatus
  };
}

module.exports = summarizeSystemMetrics;

if (require.main === module) {
  var result = summarizeSystemMetrics(72, 85, 100);
  if (!result.ok || result.gpu.status !== 'warm' || result.disk.status !== 'warning') {
    throw new Error('Self-test failed.');
  }
}
